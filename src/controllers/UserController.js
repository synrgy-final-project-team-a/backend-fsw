const UserService = require("../services/UserService");

const getAllUsers = async (req, res) => {
  console.log(req.user);
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

const createUser = async (req, res) => {
  const { email } = req.body;
  console.log({ email });
  await UserService.createUser({ email });
  res.status(201).json({ email });
}

module.exports = { getAllUsers, GetUserById, createUser };
