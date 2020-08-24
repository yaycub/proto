const fs = require('fs').promises;
const {  parseBinaryToJson, parseDataForUser } = require('./utils/parseBuffer');

fs.readFile('./txnlog.dat')
  .then(buf => parseBinaryToJson(buf))
  .then(parsedData => parsedData.filter(item => item.userId === '2456938384156277127'))
  .then(userArr => parseDataForUser(userArr))
  .then(parsedResponse => (`
    total credit amount=${parsedResponse.creditAmount}
    total debit amount=${parsedResponse.debitAmount}
    autopays started=${parsedResponse.autoPayStarted}
    autopays ended=${parsedResponse.autoPayEnded}
    balance for user ${parsedResponse.userID}=${parsedResponse.balance}
  `))
  .then(console.log)
  .catch(console.log);



