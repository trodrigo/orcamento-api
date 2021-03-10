const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/home');
const Home = mongoose.model('Home');

require('./models/orcamento');
const Orcamento = mongoose.model('Orcamento');

const app = express();

app.use(express.json());

// nexr (MIDLE)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Method", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type,Authorization");

    app.use(cors());
    next();
});

mongoose.connect('mongodb://localhost:27017/celke', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Conexão realizada com sucesso!")
}).catch((err) => {
    console.log("Erro: Conexão om o DB MongoDB não realizada")
});

app.get('/test', function (req, res) {
    res.send('THS Solutions - API Orçamento - Online')
});
//app.get('/home', function (req, res) {
//    res.send('THS Solutions - API Orçamento - Online')
//});

//app.post('/home', function(req, res) {
//    res.send('Cadastrar dados PG home!');
//});

app.get('/home', async (req, res) => {
    await Home.findOne({}).then((home) => {
        return res.json({
            error: false,
            home
        });
    }).catch((err) => {
        return res.json(400).json({
            error: true,
            message: "Erro: Nenhum registro encontrado!"
        });
    });
});

app.post('/home', async (req, res) => {
    const dados = {
        "topTitulo": "Temos a solução que a sua empresa precisa!",
        "topSubTitulo": "This is a simple hero unit, a simple Jumbotron-style " +
                        "component for calling extra attention to featured content or information. ",
        "topTextBtn": "Orçamento",
        "topLinkBtn": "http://localhost:3006/orcamento",
        "servTitulo": "Serviços",
        "servSubTitulo": "Mauris nec urna et mi pulvinar tristique eget quis nunc.",
        "servUmIcone": "laptop-code",
        "servUmTitulo": "Serviço Um",
        "servUmDesc": "Praesent quis sagittis libero, nec suscipit neque. " +
                      "Quisque ut ultrices lectus, sit amet sollicitudin mauris.",
        "servDoisIcone": "mobile-alt",
        "servDoisTitulo": "Serviço Dois",
        "servDoisDesc": "Nullam rutrum imperdiet nisi, eget facilisis elit " +
                        "consectetur accumsan lectus, sit amet sollicdin efficitur.",
        "servTresIcone": "network-wired",
        "servTresTitulo": "Serviço Três",
        "servTresDesc": "Quisque elementum suscipit dolor, sed lobortis nibh. " +
                        "Curabitur et dui iaculis, consectetur enim vitae purus..",                           
    }

    const homeExiste = await Home.findOne({});

    if (homeExiste) {
        return res.status(400).json({
            error: true,
            message: "Erro: A página já possui um registro!"
        });
    }

    await Home.create(dados, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Conteúdo da página não cadastrado!"
        });
    });

    return res.json({
        error: false,
        message: "Erro: Conteúdo da página cadastrado com sucesso!"
    })
});

app.post('/orcamento', async (req, res) => {

    await Orcamento.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Solicitação não cadastrada!"
        });
    });

    return res.json({
        error: false,
        message: "Solicitação cadastrada com sucesso!"
    })
})

app.listen(3100, function () {
    console.log('Sever iniciado na porta 3100: http://localhost:3100')
});