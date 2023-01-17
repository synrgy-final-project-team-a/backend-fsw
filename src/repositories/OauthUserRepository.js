const models = require("../../db/models/index.js");
const OauthUser = models.oauth_user;

const getUserByEmail = async ({ email }) => {
  const getUser = await OauthUser.findOne({
    where: {
      email: email,
      enabled: true
    },
  });
  return getUser;
};

const createUser = async (payload) => {
  return await OauthUser.create(payload);
};

const disabledUser = async (profileId) => {
  return OauthUser.update({
    enabled: false
  }, {
    where: {
      profile_id : profileId
    }
  })
}

const enabledUser = async (profileId) => {
  return OauthUser.update({
    enabled: false
  }, {
    where: {
      profile_id : profileId
    }
  })
}

module.exports = { getUserByEmail, createUser, disabledUser};
