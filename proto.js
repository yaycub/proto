/* eslint-disable no-console */
const fs = require('fs').promises;
const {  parseBinaryToJson, parseDataForResponse } = require('./utils/parseBuffer');

fs.readFile('./txnlog.dat')
  .then(buf => parseBinaryToJson(buf))
  .then(parsedData => {
    const userData = parsedData.filter(item => item.userId === '2456938384156277127');

    return {
      globalData: parsedData,
      userData
    };
  })
  .then(({ globalData, userData }) => parseDataForResponse(globalData, userData))
  .then(parsedResponse => (`
total credit amount=${parsedResponse.creditAmount}
total debit amount=${parsedResponse.debitAmount}
autopays started=${parsedResponse.autoPayStarted}
autopays ended=${parsedResponse.autoPayEnded}
balance for user ${parsedResponse.userID}=${parsedResponse.balance}`))
  .then(console.log)
  .catch(console.log);
