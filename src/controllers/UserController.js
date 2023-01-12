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

const createUser = async (req, res) => {
  // console.log(req.body.email);
  const { status, message, data } = await UserService.createUser({
    email: req.body.email,
    id: req.body.id,
    password: req.body.password,
  });
  res.status(status).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { getAllUsers, GetUserById, createUser };
