const userRepository = require("../repositories/UserRepository");
const oauthRepository = require("../repositories/OauthUser");

const getUsers = async () => {
  const users = await userRepository.findAllUser();

  return {
    code: 200,
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

const createUser = async (payload) => {
  try {
    // console.log({ email });

    const createUsers = await userRepository.createUser(payload);

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
