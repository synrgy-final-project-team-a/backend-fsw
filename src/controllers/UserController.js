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
  // console.log(req.body.email);
  const { status, message, data } = await UserService.createUser({
    id: req.body.id,
    not_expired: req.body.not_expired,
    not_locked: req.body.not_locked,
    credential_not_expired: req.body.credential_not_expired,
    otp: req.body.otp,
    enabled: req.body.enabled,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(status).send({
    status: status,
    message: message,
    data: data,
  });
}

module.exports = { getAllUsers, GetUserById, createUser };
