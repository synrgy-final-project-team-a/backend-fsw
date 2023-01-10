const models = require("../../db/models/index.js");
const OauthUser = models.oauth_user;

const getUserByEmail = async ({ email }) => {
  console.log(email);
  const getUser = await OauthUser.findOne({
    where: {
      email: email,
    },
  });
  return getUser;
};
module.exports = { getUserByEmail };
