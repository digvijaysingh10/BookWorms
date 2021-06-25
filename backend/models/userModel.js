const mongoose = require('../connection');

const schema = mongoose.Schema({
    fullname: String,
    avatar: String,
    email: String,
    password: String,
    address: String,
    age: Number,
    created: Date,
    isadmin: Boolean,
    contacts: [{ type: mongoose.Types.ObjectId, ref: 'Users' }],
})


const model = mongoose.model('Users', schema);

module.exports = model;
