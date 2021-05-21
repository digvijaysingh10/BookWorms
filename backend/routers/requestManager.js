const Model = require('../models/requestModel');
const router = require('express').Router();

router.get('/getall', (req, res) => {

    Model.find( {}).populate('user')
        .then(data => {
            console.log('user data fetched');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
  })


  router.post('/add', (req, res) => {
    new Model(req.body).save()
        .then(data => {
            console.log('Novel Request Added');
            res.status(200).json({ message: 'success' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})


  module.exports = router;
