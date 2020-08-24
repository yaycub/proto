const amountIncluded = [0, 1];

const parseRowWithAmount = (buf) => ({
  recordType: buf.readUInt8(0),
  unixTimeStamp: Number(buf.readUInt32BE(1)),
  userId: buf.readBigUInt64BE(5).toString(),
  amount: new DataView(buf.buffer.slice(buf.byteOffset)).getFloat64(13)
});

const parseRowWithoutAmount = (buf) => ({
  recordType: buf.readUInt8(0),
  unixTimeStamp: Number(buf.readUInt32BE(1)),
  userId: buf.readBigUInt64BE(5).toString(),
  amount: 0
});

const parseBinaryToJson = (buf) => {
  const recordAmount = buf.readUInt32BE(5);
  let offset = 9;
  return [...Array(recordAmount)].map(() => {

    if(amountIncluded.includes(buf.readUInt8(offset))){
      const bufferRow = buf.slice(offset, offset + 21);
      const parsedRow = parseRowWithAmount(bufferRow, offset);
      offset = offset + 21;
      return parsedRow;
    }

    const bufferRow = buf.slice(offset, offset + 13);
    const parsedRow = parseRowWithoutAmount(bufferRow, offset);
    offset = offset + 13;
    return parsedRow;

  });
};

const getAmount = (userData, recordType) => {
  return userData.filter(item => item.recordType === recordType)
    .reduce((acc, curr) => {
      acc = acc + curr.amount;
      return acc;
    }, 0);
};

const parseDataForUser = (userData) => ({
  userID: userData[0].userId,
  creditAmount: getAmount(userData, 0).toFixed(2),
  debitAmount: getAmount(userData, 1).toFixed(2),
  autoPayStarted: userData.filter(item => item.recordType === 2).length,
  autoPayEnded: userData.filter(item => item.recordType === 3).length,
  balance: (getAmount(userData, 0) - getAmount(userData, 1)).toFixed(2)
});

module.exports = {
  parseBinaryToJson,
  parseDataForUser
};
