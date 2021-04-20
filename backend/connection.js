const mongoose = require('mongoose');
const api_config = require('./config');

const url = api_config.conn_url;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('database successfully connected') })
    .catch(err => console.error(err));

module.exports = mongoose;