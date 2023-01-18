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

const createProfile = async (payload) => {
  const profile = await UserDetails.create(payload);
  return profile;
};

module.exports = { findAllUser, getUserById, createProfile };
