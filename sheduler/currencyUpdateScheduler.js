const schedule = require('node-schedule');
const loadRates = require('../core/loadRates');
 const rates = require('../core/rates');
const j = schedule.scheduleJob('* 12 * * *', loadRates);