var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
 console.log("order created");
 console.log(req.body);
 console.log("response");

 console.log(res.body);
 console.log("next");
 console.log(next.body);



 res.render('index', { title: 'webhooks' });
});

module.exports = router;

