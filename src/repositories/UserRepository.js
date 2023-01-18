const { sequelize, Sequelize } = require("../../db/models/index.js");
const models = require("../../db/models/index.js");
const UserDetails = models.user_details;

const findAllUser = async () => {
  const [resultUser, metadataUser] = await sequelize.query(
    "SELECT prfl.*, ou.email, ou.not_locked, ou.enabled, ouu.role_id FROM profile prfl " +
    "INNER JOIN oauth_user ou ON ou.profile_id = prfl.id " +
    "INNER JOIN oauth_user_role ouu ON ouu.user_id = ou.id " +
    "ORDER BY prfl.id ASC"
    );

  const [resultRole, metadataRole] = await sequelize.query(
    "SELECT * FROM oauth_role " +
    "ORDER BY id ASC"
    );

  let resultArr = [];
  resultUser.forEach((user, index) => {
    var usr = {};
    usr = user;
    if (index != 0) {
      if (resultArr[resultArr.length-1].id == usr.id) {
        resultRole.forEach(role => {
          if (usr.role_id == role.id) {
            resultArr[resultArr.length-1].role_name.push(role.name)
          }
        });
      } else {
        resultRole.forEach(role => {
          if (usr.role_id == role.id) {
            usr.role_name = [role.name];
          }
        });
        delete usr.role_id;
        resultArr.push(usr);
      }
    } else {
      resultRole.forEach(role => {
        if (user.role_id == role.id) {
          usr.role_name = [role.name];
        }
      });
      delete usr.role_id;
      resultArr.push(usr);
    }
  });

  return resultArr;
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
