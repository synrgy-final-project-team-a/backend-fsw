const models = require("../../db/models/index.js");
const OauthUser = models.oauth_user;

const getUserByEmail = async ({ email }) => {
  const getUser = await OauthUser.findOne({
    where: {
      email: email,
    },
  });
  return getUser;
};
const createUser = async (payload) => {
  return await OauthUser.create(payload);
};

module.exports = { getUserByEmail, createUser };
