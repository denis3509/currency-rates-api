const schedule = require('node-schedule');
const currencyRates = require('../currencyRates');


const loadRatesSchedule = schedule.scheduleJob('* */12 * * *', currencyRates.loadRates);
const j = schedule.scheduleJob('*/1 * * * *', currencyRates.reloadUntilON);