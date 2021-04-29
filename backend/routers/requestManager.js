router.get('/getall', (req, res) => {

    Model.find( {})
        .then(data => {
            console.log('user data fetched');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
  })
  
  module.exports = router;