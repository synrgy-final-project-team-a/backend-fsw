const userRepository = require("../repositories/UserRepository");
const oauthUserRepository = require("../repositories/OauthUserRepository");
const oauthUserRoleRepository = require("../repositories/OauthUserRoleRepository");
const bcrypt = require("bcrypt");

const deleteUser = async (id) => {
  try {
    const getUserById = await userRepository.getUserById(id);
    await oauthUserRepository.disabledUser(id);
    const deleteProfileUser = await userRepository.deleteUser(id);
    if (!deleteProfileUser) {
      await oauthUserRepository.enabledUser(id);
      return {
        status: 500,
        message: "Failed Deleted User",
        data: null,
      };
    }

    return {
      status: 200,
      message: "Success Deleted User",
      data: getUserById,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
};

const getUsers = async () => {
  const users = await userRepository.findAllUser();

  return {
    status: 200,
    message: "Retrive Data Users",
    data: users,
  };
};
const getDetailUser = async ({ email }) => {
  try {
    const getUserId = await oauthUserRepository.getUserByEmail({ email });
    const profile_id = getUserId.profile_id;
    const getUser = await userRepository.getUserById(profile_id);

    if (!getUser) {
      return {
        status: 400,
        message: "User not found",
        data: null,
      };
    }
    return {
      status: 200,
      message: "Get User data success",
      data: getUser,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const createUser = async ({
  email,
  password,
  enabled,
  not_expired,
  not_locked,
  credential_not_expired,
  role_id,
}) => {
  try {
    const emailAlreadyExist = await oauthUserRepository.getUserByEmail({
      email,
    });
    if (emailAlreadyExist) {
      return {
        status: 400,
        message: "Email Already Exist, try another email!",
        data: null,
      };
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const payload = {
        email: email,
        password: hashedPassword,
        enabled: enabled,
        not_expired: not_expired,
        not_locked: not_locked,
        credential_not_expired: credential_not_expired,
      };

      const user = await oauthUserRepository.createUser(payload);

      if (!user) {
        return {
          status: 400,
          message: "Failed to add user",
          data: null,
        };
      } else {
        const userId = user.id;

        const payloadUserRole = {
          user_id: userId,
          role_id: role_id,
        };

        const createUserRole = await oauthUserRoleRepository.createUserRole(
          payloadUserRole
        );

        if (!createUserRole) {
          return {
            status: 400,
            message: "Failed to add user role",
            data: null,
          };
        }

        return {
          status: 200,
          message: "Post User data success",
          data: {
            id: userId,
            email: payload.email,
            role_id: role_id,
            enabled: payload.enabled,
            not_expired: payload.not_expired,
            not_locked: payload.not_locked,
            credential_not_expired: payload.credential_not_expired,
          },
        };
      }
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const getUserById = async ({ id }) => {
  try {
    const getUser = await userRepository.getUserById(id);

    if (!getUser) {
      return {
        status: 400,
        message: "User not found",
        data: null,
      };
    }
    return {
      status: 200,
      message: "Get User data success",
      data: getUser,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
module.exports = {
  getUsers,
  getDetailUser,
  createUser,
  deleteUser,
  getUserById,
};
