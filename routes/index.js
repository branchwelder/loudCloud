var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hellllooooooooo');
});

router.get('/config', function(req, res, next) {
  res.send('hellooooo')
});

module.exports = router;
