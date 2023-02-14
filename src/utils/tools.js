const yup = require("yup");
const jwt = require("jsonwebtoken");

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop, callback-return
    await callback(array[index], index, array);
  }
}

const decodeToken = async(token) => {
  const decoded = await jwt.verify(token, "s3cr3t");
  return decoded;
};

module.exports = {asyncForEach, yup, jwt, decodeToken};