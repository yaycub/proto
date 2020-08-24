/* eslint-disable no-console */
const fs = require('fs').promises;
const {  
  parseBinaryToJson, 
  parseDataForResponse, 
  stringifyResponse 
} = require('./utils/parseBuffer');

const protoParser = userID => {
  return fs.readFile('./txnlog.dat')
    .then(buf => parseBinaryToJson(buf))
    .then(parsedData => parseDataForResponse(parsedData, userID))
    .then(parsedResponse => stringifyResponse(parsedResponse))
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

protoParser('2456938384156277127');
