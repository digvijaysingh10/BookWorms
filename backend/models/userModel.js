const mongoose = require('../connection');

const schema = mongoose.Schema({
    fullname: String,
    avatar: String,
    email: String,
    password: String,
    age: Number,
    created: Date,
    isadmin: Boolean
})


const model = mongoose.model('Users', schema);

module.exports = model;