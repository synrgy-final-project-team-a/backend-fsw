const UserService = require("../services/UserService");
const cloudinary = require("../utils/cloudinaryConfig");
const fs = require('fs');

const deleteUser = async(req, res) => {
  const id = req.params.id;

  const deletedUser = await UserService.deleteUser(id);
  res.status(deletedUser.status).json(deletedUser);
}

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
  const {
    email,
    password,
    role_id,
    address,
    city,
    first_name,
    gmaps,
    last_name,
    phone_number,
    province,
    gender,
  } = req.body;
  const role_id_arr = role_id.split(",");
  const pathFile = req.file.destination + req.file.filename;
  const result = await cloudinary.cloudinary.uploader.upload(pathFile);
  fs.unlinkSync(pathFile)
  const avatar = result.url;

  const { status, message, data } = await UserService.createUser({
    email: email,
    password: password,
    role_id: role_id_arr,
    address: address,
    city: city,
    first_name: first_name,
    gmaps: gmaps,
    last_name: last_name,
    phone_number: phone_number,
    province: province,
    gender: gender,
    avatar: avatar,
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

module.exports = { getAllUsers, GetUserById, createUser, deleteUser };
