const fs = require("fs");
const validation = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      // file: req.files?req.files[0]:null,
      body: req.body,
      query: req.query,
      params: req.params,
      noUnknown: true,
      strict: true,
    });
    return next();
  } catch (err) {
    // if (req.files) {
    //   const pathFile = req.files[0].destination + req.files[0].filename;
    //   fs.unlinkSync(pathFile)
    // }
    return res
      .status(400)
      .json({ status: 400, message: err.message, data: err.name });
  }
};

module.exports = {  
  validation,
};
