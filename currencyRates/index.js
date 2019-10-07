const https = require('https');


let currencyRates = {
  status: 'OFF',
  providerName: null,
  date: null,
  rates: null,
  base: null,
  error: null,
};


const getRates = () => {
  return currencyRates.rates;
};

const ratesAPIs = [
  {
    providerName: 'api.exchangeratesapi.io',
    url: 'https://api.exchangeratesapi.io/latest',
  },
  {
    providerName: 'api.ratesapi.io',
    url: 'https://api.ratesapi.io/api/latest',
  },

];

let step = 0;

const loadRates = () => {
  https.get(ratesAPIs[step].url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      let {rates, base, date} = JSON.parse(data);
      const   providerName  = ratesAPIs[step].providerName;
      rates[base] = 1;
      currencyRates = Object.assign({}, currencyRates, {rates, base, date, providerName, status: 'ON'});
      console.log(`rates loaded, provided by ${providerName}`)
    });

  }).on("error", (error) => {

    if (step === ratesAPIs.length - 1) {
      currencyRates = Object.assign({}, currencyRates, {status: 'OFF', error});
      step = 0;
      console.log('error', error)
    } else {

      console.log(`${ratesAPIs[step].providerName} are not available`);
      step = step + 1;
      loadRates();
    }
  });
};
const getCurrencyCodes = () => {
  const {status} = currencyRates;

  if (status === 'ON') {
    return Object.entries(currencyRates.rates).map(([key, value]) => key);
  }
  throw new Error('service are not available now');
};
const convert = (amount, from, to) => {
  const {rates, status} = currencyRates;
  if (status === 'ON') {
    if (rates.hasOwnProperty(from) && rates.hasOwnProperty(to)) {
      return rates[to] / rates[from] * amount;
    } else {
      throw Error('rates are not provided');
    }
  }
  throw new Error('service are not available now');
};
const reloadUntilON = () => {

  const {status} = currencyRates;
  if (status === 'OFF') {
    loadRates();
  }
};

module.exports = {
  getRates,
  convert,
  loadRates,
  reloadUntilON,
  getCurrencyCodes
};