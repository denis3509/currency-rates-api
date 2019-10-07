const express = require('express');
const router = express.Router();
const currencyRates = require('../controllers/currencyRates');

router.get('/', function (req, res, next) {
  res.render('index', {title: 'welcome to loadRates api'});
});
router.get('/currencyCodes', currencyRates.getCurrencyCodes);
router.get('/convert',currencyRates.convert);
module.exports = router;