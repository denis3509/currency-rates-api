var express = require('express');
var router = express.Router();
const first = require('../controllers/first');
const second = require('../controllers/second');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;