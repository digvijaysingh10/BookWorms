const { Mongoose } = require('mongoose');
const mongoose = require('../connection');

const schema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'Users' },
    text: String,
    created: Date,
})

const model = mongoose.model('comments', schema);

module.exports = model;