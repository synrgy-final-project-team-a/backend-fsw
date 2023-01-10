const userRepository = require("../repositories/UserRepository");
const getUsers = async () => {
  const users = await userRepository.findAllUser();

  return {
    code: 200,
    message: "Retrive Data Users",
    data: users,
  };
};
const getUserById = async ({ userId }) => {
  try {
    const getUser = await userRepository.getUserById({ userId });

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
module.exports = { getUsers, getUserById };
