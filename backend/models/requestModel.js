const { Mongoose } = require('mongoose');
const mongoose = require('../connection');
const schema = mongoose.Schema({
    user : { type : mongoose.Types.ObjectId, ref: 'Users'},
    novel : { type : mongoose.Types.ObjectId, ref: 'Novels'},
    title : String,
    data : Object,
    created : Date,



})

const model = mongoose.model('Requests', schema);

module.exports = model;
