const { sequelize, Sequelize } = require("../../db/models/index.js");
const models = require("../../db/models/index.js");
const UserDetails = models.user_details;

const findAllUser = async (startAt, endAt) => {
  const [resultUser, metadataUser] = await sequelize.query(
    "SELECT prfl.*,prfl.id as profile_id, ou.id as user_id, ou.email, ou.not_locked, ou.enabled, ouu.role_id FROM profile prfl " +
      "INNER JOIN oauth_user ou ON ou.profile_id = prfl.id " +
      "INNER JOIN oauth_user_role ouu ON ouu.user_id = ou.id " +
      "WHERE prfl.deleted_at IS NULL " +
      "ORDER BY prfl.id ASC "
  );

  const [resultRole, metadataRole] = await sequelize.query(
    "SELECT * FROM oauth_role " + "ORDER BY id ASC"
  );

  let resultArr = [];
  resultUser.forEach((user, index) => {
    var usr = {};
    usr = user;
    if (index != 0) {
      if (resultArr[resultArr.length - 1].id == usr.id) {
        resultRole.forEach((role) => {
          if (usr.role_id == role.id) {
            resultArr[resultArr.length - 1].role_name.push(role.name);
          }
        });
      } else {
        resultRole.forEach((role) => {
          if (usr.role_id == role.id) {
            usr.role_name = [role.name];
          }
        });
        delete usr.role_id;
        resultArr.push(usr);
      }
    } else {
      resultRole.forEach((role) => {
        if (user.role_id == role.id) {
          usr.role_name = [role.name];
        }
      });
      delete usr.role_id;
      resultArr.push(usr);
    }
    // delete usr.id;
  });

  const finalResult = resultArr.slice(startAt, endAt);
  return { result: finalResult, total: resultArr.length };
};

const getUserById = async (profile_id) => {
  const getUser = await UserDetails.findOne({
    where: {
      id: profile_id,
    },
  });
  return getUser;
};

const getUserByAdmin = async (profile_id) => {
  const [resultUser, metadataUser] = await sequelize.query(
    "SELECT prfl.*, ou.email, ou.not_locked, ou.enabled, ouu.role_id FROM profile prfl " +
      "INNER JOIN oauth_user ou ON ou.profile_id = prfl.id " +
      "INNER JOIN oauth_user_role ouu ON ouu.user_id = ou.id " +
      `WHERE prfl.deleted_at IS NULL AND prfl.id = ${profile_id}`
  );

  const [resultRole, metadataRole] = await sequelize.query(
    "SELECT * FROM oauth_role " + "ORDER BY id ASC"
  );

  let resultArr = [];
  resultUser.forEach((user, index) => {
    var usr = {};
    usr = user;
    if (index != 0) {
      if (resultArr[resultArr.length - 1].id == usr.id) {
        resultRole.forEach((role) => {
          if (usr.role_id == role.id) {
            resultArr[resultArr.length - 1].role_name.push(role.name);
          }
        });
      } else {
        resultRole.forEach((role) => {
          if (usr.role_id == role.id) {
            usr.role_name = [role.name];
          }
        });
        delete usr.role_id;
        resultArr.push(usr);
      }
    } else {
      resultRole.forEach((role) => {
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

const createProfile = async (payload) => {
  const profile = await UserDetails.create(payload);
  return profile;
};

const deleteUser = async (id) => {
  return UserDetails.destroy({
    where: {
      id: id,
    },
  });
};

const updateProfile = async ({
  id,
  address,
  avatar,
  city,
  first_name,
  gmaps,
  last_name,
  phone_number,
  province,
  gender,
  updated_at,
  bank_account,
  bank_name,
  bank_username,
  status
}) => {
  const updateProfile = await UserDetails.update(
    {
      id,
      address,
      avatar,
      city,
      first_name,
      gmaps,
      last_name,
      phone_number,
      province,
      gender,
      updated_at,
      bank_account,
      bank_name,
      bank_username,
      status
    },
    { where: { id } }
  );
  return updateProfile;
};

const getProfile = async (id) => {
  const getProfil = await UserDetails.findOne({ where: { id: id } });
  return getProfil;
};

module.exports = {
  findAllUser,
  getUserById,
  deleteUser,
  createProfile,
  getUserByAdmin,
  updateProfile,
  getProfile,
};
