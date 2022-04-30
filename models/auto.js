const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Auto = db.model('Auto', {
    marka : String,
    model : String,
    evjarat : Number,
    allapot : String,
    km_ora : Number,
    uzemanyag : String,
    hengerurtartalom : String,
    hajtas : String,
    ar : Number,
    tel : String,
    img: String
});

module.exports = Auto;