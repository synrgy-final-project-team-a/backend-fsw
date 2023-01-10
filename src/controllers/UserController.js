const UserService = require("../services/UserService");

const getAllUsers = async (req, res) => {
  const users = await UserService.getUsers();

  res.status(200).json(users);
};
const GetUserById = async (req, res) => {
  const { status, message, data } = await UserService.getUserById({
    userId: req.user.id,
  });
  res.status(status).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { getAllUsers, GetUserById };
