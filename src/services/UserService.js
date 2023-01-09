const userRepository = require("../repositories/UserRepository");

const getUsers = async () => {
  const users = await userRepository.findAllUser();

  return {
    code: 200,
    message: "Retrive Data Users",
    data: users,
  };
};
const getUserById = async ({ user_id }) => {
  try {
    const getUser = await userRepository.getUserById({ user_id });

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

const createUser = async (user) => {
  await userRepository.createUser(user)

  return {
    code: 201,
    message: "Create User success",
    data: user,
  };
}

module.exports = { getUsers, getUserById, createUser };
