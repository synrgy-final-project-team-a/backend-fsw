const yup = require('yup');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      // eslint-disable-next-line no-await-in-loop, callback-return
      await callback(array[index], index, array);
    }
}

module.exports = {asyncForEach, yup}