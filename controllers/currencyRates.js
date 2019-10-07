const currencyRates = require('../currencyRates');
const createError = require('http-errors');
const getCurrencyCodes = (req, res, next) => {
  let codes;
  try {
    codes = currencyRates.getCurrencyCodes();
  } catch (error) {
    return next(createError(500, error.message ? error.message : 'services are not available'));
  }
  res.send({codes});
};
const convert = (req, res, next) => {
  const {amount, from, to} = req.query;
  if (amount && from && to) {
  let exchangeResult;

  try {
    exchangeResult = currencyRates.convert(amount, from, to)
  } catch (error) {
    return next(createError(500, 'service are not available now'));
  }

  res.send({exchangeResult});
  } else {
    next(createError(400, 'bad query'))
  }

};
module.exports = {
  getCurrencyCodes,
  convert,
};