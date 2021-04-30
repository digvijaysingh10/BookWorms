const { Mongoose } = require('mongoose');
const mongoose = require('../connection');
const schema = mongoose.Schema({
    user : { type : mongoose.Types.ObjectId, ref: 'Users'},
    title : String,
    desc : String,
    author : String,
    genre : String,
    avatar : String,
    data : Object,
    created : Date,
    price : Number,
    rating : Number,
    rentable : Boolean,
    exchangable : Boolean,
    soldable : Boolean,
    rentPrice : Number,



})

const model = mongoose.model('Novels', schema);

module.exports = model;
