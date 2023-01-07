const userRepository = require('../repositories/UserRepository');

const getUsers = async () => {
    const users = await userRepository.findAllUser();

    console.log(users);
    return {
        code: 200,
        message: 'Retrive Data Users',
        data: users
    }
}

module.exports = {getUsers};