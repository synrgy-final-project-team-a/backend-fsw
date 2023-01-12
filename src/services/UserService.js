const userRepository = require("../repositories/UserRepository");
const oauthRepository = require("../repositories/OauthUser");

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

const createUser = async ({ email,id, password }) => {
  try {
    // console.log({ email });

    await userRepository.createUser({ email, id, password });

    if (!createUsers) {
      return {
        status: 400,
        message: "Failed to add user",
        data: null,
      };
    }
    return {
      status: 200,
      message: "Post User data success",
      data: { email },
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
}

module.exports = { getUsers, getUserById, createUser };
