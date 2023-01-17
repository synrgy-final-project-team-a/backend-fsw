const models = require("../../db/models/index.js");
const UserDetails = models.user_details;

const findAllUser = async () => {
  return await UserDetails.findAll();
};

const getUserById = async (profile_id) => {
  const getUser = await UserDetails.findOne({
    where: {
      id: profile_id,
    },
  });
  return getUser;
};

const deleteUser = async (id) => {
  return UserDetails.destroy({
    where: {
      id: id
    }
  })
}


module.exports = { findAllUser, getUserById, deleteUser };
