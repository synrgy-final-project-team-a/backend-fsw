const userRepository = require("../repositories/UserRepository");
const oauthUserRepository = require("../repositories/OauthUserRepository");
const bcrypt = require('bcrypt');

const getUsers = async () => {
  const users = await userRepository.findAllUser();

  return {
    status: 200,
    message: "Retrive Data Users",
    data: users,
  };
};
const getUserById = async ({ email }) => {
  try {
    const getUserId = await oauthRepository.getUserByEmail({ email });

    // console.log(getUserId.profile_id);
    const payload = {
      id: getUserId.profile_id,
    };
    // console.log(payload)
    const getUser = await userRepository.getUserById(payload);

    // console.log(getUser);

    if (!getUser) {
      return {
        status: 400,
        message: "User not found",
        data: null,
      };
    }
    return {
      status: 200,
      message: "Get User data success",
      data: getUser,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const createUser = async ({
  email,
  password,
  enabled,
  not_expired,
  not_locked,
  credential_not_expired,
}) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const payload = {
      email: email,
      password: hashedPassword,
      enabled: enabled,
      not_expired: not_expired,
      not_locked: not_locked,
      credential_not_expired: credential_not_expired,
    };

    const user = await oauthUserRepository.createUser(payload);

    if (!user) {
      return {
        status: 400,
        message: "Failed to add user",
        data: null,
      };
    }
    return {
      status: 200,
      message: "Post User data success",
      data: payload ,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

module.exports = { getUsers, getUserById, createUser };
