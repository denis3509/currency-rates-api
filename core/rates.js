let rates={
};
const refreshRates = (newRates) => {
rates = newRates;
};
const getRates = () => {
    return rates;
}
module.exports={
    refreshRates,
    getRates,
};