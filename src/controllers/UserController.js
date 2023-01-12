const UserService = require("../services/UserService");

const getAllUsers = async (req, res) => {
  const users = await UserService.getUsers();

  res.status(users.status).json(users);
};
const GetUserById = async (req, res) => {
  const data = await UserService.getUserById({
    email: req.user.user_name,
  });
  res.status(data.status).json(data);
};

module.exports = { getAllUsers, GetUserById };
