const { Mongoose } = require('mongoose');
const mongoose = require('../connection');
const schema = mongoose.Schema({

    user : { type : mongoose.Types.ObjectId, ref: 'Users'},

    data : Object,

    created : Date,


})

const model = mongoose.model('order', schema);

module.exports = model;
