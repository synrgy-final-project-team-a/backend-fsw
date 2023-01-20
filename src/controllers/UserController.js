const UserService = require("../services/UserService");
const cloudinary = require("../utils/cloudinaryConfig");
const fs = require("fs");

const deleteUser = async (req, res) => {
  const id = req.params.id;

  const deletedUser = await UserService.deleteUser(id);
  res.status(deletedUser.status).json(deletedUser);
};

const getAllUsers = async (req, res) => {
  const users = await UserService.getUsers();

  res.status(users.status).json(users);
};

const getDetailUser = async (req, res) => {
  const data = await UserService.getDetailUser({
    email: req.user.user_name,
    role: req.user.role,
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
  const pathFile = req.files[0].destination + req.files[0].filename;
  const result = await cloudinary.cloudinary.uploader.upload(pathFile);
<<<<<<< HEAD
  fs.unlinkSync(pathFile)
  
=======
  fs.unlinkSync(pathFile);
>>>>>>> 679af1765895d13b4fb5eda84205d351ef23ccc9
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

const getUserById = async (req, res) => {
  const data = await UserService.getUserById({
    id: req.params.id,
  });
  res.status(data.status).json(data);
};

module.exports = {
  getUserById,
  getAllUsers,
  getDetailUser,
  createUser,
  deleteUser,
};
