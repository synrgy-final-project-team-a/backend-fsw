const UserService = require("../services/UserService");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await UserService.getUsers();

  res.status(200).json(users);
};

const GetUserById = async (req, res) => {
  // console.log(req.user.user_name);
  const { status, message, data } = await UserService.getUserById({
    email: req.user.user_name,
  });
  res.status(status).send({
    status: status,
    message: message,
    data: data,
  });
};

const createUser = async (req, res) => {
  console.log(req.body);

  const { email, id, password } = req.body;
  console.log(email, id, password, "ini di controller")
  const { status, message, data } = await UserService.createUser({
    email: email,
    id: id,
    password: password,
    enabled: true,
    not_expired: true,
    not_locked: true,
    credential_not_expired: true,
  });
  res.status(status).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { getAllUsers, GetUserById, createUser };
