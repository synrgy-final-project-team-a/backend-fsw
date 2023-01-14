const models = require("../../db/models/index.js");
const UserDetails = models.user_details;

const findAllUser = async () => {
  return await UserDetails.findAll();
};
const getUserById = async (payload) => {
  const getUser = await UserDetails.findOne({
    where: {
      id: payload.id,
    },
  });
  return getUser;
};


module.exports = { findAllUser, getUserById };
