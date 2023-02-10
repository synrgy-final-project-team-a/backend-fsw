const UserService = require("../services/UserService");
const cloudinary = require("../utils/cloudinaryConfig");
const fs = require("fs");

const deleteUser = async (req, res) => {
  const id = req.params.id;

  const deletedUser = await UserService.deleteUser(id);
  res.status(deletedUser.status).json(deletedUser);
};

const getAllUsers = async (req, res) => {
  const page = req.query.page - 1;
  const users = await UserService.getUsers(page);

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
    bank_account,
    bank_name,
    bank_username,
    status,
  } = req.body;
  const status2 = status;

  const role_id_arr = role_id.split(",");
  if (req.files[0] == undefined) {
    res.status(400).send({
      status: 400,
      message: "Avatar must be uploaded",
      data: null,
    });
  } else {
    if (
      req.files[0].mimetype !== "image/jpeg" &&
      req.files[0].mimetype !== "image/png"
    ) {
      return res.status(400).send({
        status: 400,
        message: "Avatar must be jpg or png mimetype.",
        data: null,
      });
    }
    // const pathFile = req.files[0].destination + req.files[0].filename;
    const result = await cloudinary.cloudinary.uploader.upload(
      req.files[0].path
    );
    // fs.unlinkSync(pathFile);

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
      bank_account: bank_account,
      bank_name: bank_name,
      bank_username: bank_username,
      status: status2,
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
  }
};

const getUserById = async (req, res) => {
  const data = await UserService.getUserById({
    id: req.params.id,
  });
  res.status(data.status).json(data);
};

const editProfile = async (req, res) => {
  const {
    address,
    city,
    first_name,
    gmaps,
    last_name,
    phone_number,
    province,
    gender,
    bank_account,
    bank_name,
    bank_username,
    status,
  } = req.body;

  const status2 = status;

  if (req.files[0] == undefined) {
    const { status, message, data } = await UserService.updateProfile({
      email: req.user.user_name,
      address: address,
      city: city,
      first_name: first_name,
      gmaps: gmaps,
      last_name: last_name,
      phone_number: phone_number,
      province: province,
      gender: gender,
      bank_account: bank_account,
      bank_name: bank_name,
      bank_username: bank_username,
      status: status2,
    });

    res.status(status).send({
      status: status,
      message: message,
      data: data,
    });
  } else {
    if (
      req.files[0].mimetype !== "image/jpeg" &&
      req.files[0].mimetype !== "image/png"
    ) {
      return res.status(400).send({
        status: 400,
        message: "Avatar must be jpg or png mimetype.",
        data: null,
      });
    }
    const result = await cloudinary.cloudinary.uploader.upload(
      req.files[0].path
    );
    const avatar = result.url;

    const { status, message, data } = await UserService.updateProfile({
      email: req.user.user_name,
      address: address,
      city: city,
      first_name: first_name,
      gmaps: gmaps,
      last_name: last_name,
      phone_number: phone_number,
      province: province,
      gender: gender,
      avatar: avatar,
    });

    res.status(status).send({
      status: status,
      message: message,
      data: data,
    });
  }
};

module.exports = {
  getUserById,
  getAllUsers,
  getDetailUser,
  createUser,
  deleteUser,
  editProfile,
};
