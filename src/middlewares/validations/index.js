const validation = (schema) => async (req, res, next) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
        noUnknown: true,
        strict: true,
      });
      return next();
    } catch (err) {
      return res
        .status(400)
        .json({status:400,message: err.message, data: err.name});
    }
  };
  
  module.exports = {
    validation,
  };