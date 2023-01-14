const models = require("../../db/models/index.js");
const OauthUserRole = models.oauth_user_role;

const getById = async ({ user_id }) => {
  const getId = await OauthUserRole.findAll({
    where: {
      user_id: user_id,
    },
  });
  return getId;
};

const createUserRole = async (payload) => {
  OauthUserRole.removeAttribute("id");
  const userRoleId = payload.role_id.length;
  for (var i = 0; i < userRoleId; i++) {
    OauthUserRole.create({
      user_id: payload.user_id,
      role_id: payload.role_id[i],
    });
  }

  return payload;
};

module.exports = { getById, createUserRole };
