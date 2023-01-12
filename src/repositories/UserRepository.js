const models = require("../../db/models/index.js");
const UserDetails = models.user_details;
const User = models.oauth_user;

const findAllUser = async () => {
  return await UserDetails.findAll();
};
const getUserById = async (payload) => {
  // console.log(payload);
  const getUser = await UserDetails.findOne({
    where: {
      id: payload.id,
    },
  });
  return getUser;
};

const createUser = async (payload) => {
  console.log(payload)
  console.log("ini repositori ==============")
  return await User.create(payload);
};


module.exports = { findAllUser, getUserById, createUser };
