const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const home= new Schema({
    topTitulo: {
        type: String
    },
    topSubTitulo: {
        type: String
    },
    topTextBtn: {
        type: String
    },
    topLinkBtn: {
        type: String
    },
    servTitulo: {
        type: String
    },
    servSubTitulo: {
        type: String
    },
    servUmIcone: {
        type: String
    },
    servUmTitulo: {
        type: String
    },
    servUmDesc: {
        type: String
    },
    servDoisIcone: {
        type: String
    },
    servDoisTitulo: {
        type: String
    },
    servDoisDesc: {
        type: String
    },
    servTresIcone: {
        type: String
    },
    servTresTitulo: {
        type: String
    },
    servTresDesc: {
        type: String
    },    
}, {
    timestamps: true,
});

mongoose.model('Home', home);