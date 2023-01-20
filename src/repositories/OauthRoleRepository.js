const models = require("../../db/models/index.js");
const OauthRole = models.oauth_role;

const getById = async (id) => {
  const getId = await OauthRole.findOne({
    where: {
      id: id,
    },
  });
  return getId;
};

module.exports = { getById };
