# currency-rates-api

Для установки зависимостей воспользуйтесь командой "npm i"
Для запуска "npm start"

Номер порта хранится в config/index

Методы api:

GET: {url}/convert?amount=${input}&from=${from}&to=${to}. url -адрес сервера, input - исходная сумма, from - исходная валюта, to - целевая валюта. В ответ возвращается exchangeResult - результат конвертации.

GET: {url}/currencyCodes. Возвращает массив с кодами доступных валют.

основной модуль конвертера валют находится в папке currencyRates.
