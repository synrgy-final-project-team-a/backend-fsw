const UserService = require("../services/UserService");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await UserService.getUsers();

  res.status(200).json(users);
};
const GetUserById = async (req, res) => {
  console.log(req.user.user_name);
  const { status, message, data } = await UserService.getUserById({
    email: req.user.user_name,
  });
  res.status(status).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { getAllUsers, GetUserById };
