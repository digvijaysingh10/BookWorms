const { Mongoose } = require('mongoose');
const mongoose = require('../connection');
const schema = mongoose.Schema({
    user : { type : mongoose.Types.ObjectId, ref: 'Users'},

    text : String,

    created : Date,
   
    rating : Number,
   

    

})

const model = mongoose.model('Users', schema);

module.exports = model;