const userRepository = require("../repositories/UserRepository");
const oauthUserRepository = require("../repositories/OauthUserRepository");
const oauthUserRoleRepository = require("../repositories/OauthUserRoleRepository");
const bcrypt = require("bcrypt");

const deleteUser = async(id) => {
  try {
    const getUserById = await userRepository.getUserById(id);
    await oauthUserRepository.disabledUser(id);
    const deleteProfileUser = await userRepository.deleteUser(id);
    if (!deleteProfileUser) {
      await oauthUserRepository.enabledUser(id);
      return {
        status: 500,
        message: "Failed Deleted User",
        data: null
      }
    }
    
    return {
      status: 200,
      message: "Success Deleted User",
      data: getUserById
    }
  } catch (error) {
    
    console.log(error);
    return {
      status: 500,
      message: "Internal Server Error",
      data: null
    }
  }
}

const getUsers = async () => {
  const users = await userRepository.findAllUser();

  return {
    status: 200,
    message: "Retrive Data Users",
    data: users,
  };
};
const getUserById = async ({ email }) => {
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
  role_id,
  address,
  city,
  first_name,
  gmaps,
  last_name,
  phone_number,
  province,
  gender,
  avatar,
  enabled,
  not_expired,
  not_locked,
  credential_not_expired,
}) => {
  try {
    const payloadCreateProfile = {
      address: address,
      city: city,
      first_name: first_name,
      gmaps: gmaps,
      last_name,
      phone_number,
      province,
      gender: gender,
      avatar: avatar,
    };
    const createProfile = await userRepository.createProfile(
      payloadCreateProfile
    );

    if (!createProfile) {
      return {
        status: 400,
        message: "Failed to create profile",
        data: null,
      };
    } else {
      // console.log(createProfile, "----> ini createProfile");

      const idProfile = createProfile.id;

      const hashedPassword = await bcrypt.hash(password, 10);

      const payloadCreateUser = {
        email: email,
        password: hashedPassword,
        enabled: enabled,
        not_expired: not_expired,
        not_locked: not_locked,
        credential_not_expired: credential_not_expired,
        profile_id: idProfile,
      };

      const user = await oauthUserRepository.createUser(payloadCreateUser);

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
            email: payloadCreateUser.email,
            address: createProfile.address,
            avatar: createProfile.avatar,
            city: createProfile.city,
            first_name: createProfile.first_name,
            gmaps: createProfile.gmaps,
            last_name: createProfile.last_name,
            phone_number: createProfile.phone_number,
            province: createProfile.province,
            gender: createProfile.gender,
            created_at: createProfile.created_at,
            role_id: role_id,
            enabled: payloadCreateUser.enabled,
            not_expired: payloadCreateUser.not_expired,
            not_locked: payloadCreateUser.not_locked,
            credential_not_expired: payloadCreateUser.credential_not_expired,
          },
        };
      }
    }
  } catch (error) {
    console.log(error, "ini errornya");
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const createProfile = async ({
  address,
  avatar,
  city,
  first_name,
  gmaps,
  last_name,
  phone_number,
  province,
  gender,
}) => {
  try {
    const profile = await userRepository.createProfile({
      address,
      avatar,
      city,
      first_name,
      gmaps,
      last_name,
      phone_number,
      province,
      gender,
    });
  } catch (error) {
    console.log(error, "ini errornya prfile");
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

module.exports = { getUsers, getUserById, createUser, createProfile };
