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

module.exports = router;
