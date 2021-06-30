const Model = require('../models/orderModel');
const router = require('express').Router();

router.get('/getall', (req, res) => {

    Model.find({}).populate('user')
        .then(data => {
            console.log('novel data fetched');
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

router.get('/getbyuser/:id', (req, res) => {
    Model.find({ user: req.params.id })
        .then(data => {
            console.log('Order fetched by user');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.delete('/delete/:id', (req, res) => {

  Model.findByIdAndDelete(req.params.id)
      .then(data => {
          console.log('order data deleted');
          res.status(200).json(data);
      })
      .catch(err => {
          console.error(err);
          res.status(500).json(err);
      })
})

module.exports = router;
