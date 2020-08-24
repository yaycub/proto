/* eslint-disable no-console */
const fs = require('fs').promises;
const {  
  parseBinaryToJson, 
  parseJsonForResponse, 
  stringifyResponse 
} = require('./utils/parseBuffer');

const protoParser = userID => {
  return fs.readFile('./txnlog.dat')
    .then(buf => parseBinaryToJson(buf))
    .then(parsedData => parseJsonForResponse(parsedData, userID))
    .then(parsedResponse => stringifyResponse(parsedResponse))
    .then(stringedRes => console.log(stringedRes))
    .catch(err => console.log(err));
};

protoParser('2456938384156277127');
