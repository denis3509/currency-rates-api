const https = require('https');
const rates = requires('./rates');

const loadRates = () => {
    https.get('https://api.exchangeratesapi.io/latest', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            const newRates = JSON.parse(data);
            rates.refreshRates(newRates);

        });

    }).on("error", (err) => {
        console.log("Error: " + err.message); // TODO
    });
}

module.exports = loadRates;