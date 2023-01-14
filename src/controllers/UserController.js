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
  const { email, password, role_id } = req.body;

  if (!email || !password || !role_id) {
    res.status(400).send({
      status: 400,
      message: "Email, Password, Role can't be null",
      data: null,
    });
  } else {
    const { status, message, data } = await UserService.createUser({
      email: email,
      password: password,
      enabled: true,
      not_expired: true,
      not_locked: true,
      credential_not_expired: true,
      role_id: role_id,
    });

    res.status(status).send({
      status: status,
      message: message,
      data: data,
    });
  }
};

module.exports = { getAllUsers, GetUserById, createUser };
