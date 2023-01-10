const UserService = require("../services/UserService");

const getAllUsers = async (req, res) => {
    console.log(req.user);
    const users = await UserService.getUsers();

    res.status(200).json(users);
}

module.exports = {getAllUsers};