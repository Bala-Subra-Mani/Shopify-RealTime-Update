var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(process.env);

  res.render('index', { title: 'New Express' });
});

module.exports = router;
