const { sequelize } = require("../../db/models/index.js");
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

const getUserByEmailWhereNotDeleted = async(email) => {
  const [result, metadata] = await sequelize.query(
    "SELECT * FROM profile prfl " +
    "INNER JOIN oauth_user ou ON ou.profile_id = prfl.id " +
    "WHERE prfl.deleted_at IS NULL AND " +
    `ou.email = '${email}'`
  );

  return result;
}

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

module.exports = { getUserByEmail, createUser, disabledUser, enabledUser, getUserByEmailWhereNotDeleted};
