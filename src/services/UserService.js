const userRepository = require("../repositories/UserRepository");
const oauthUserRepository = require("../repositories/OauthUserRepository");
const oauthUserRoleRepository = require("../repositories/OauthUserRoleRepository");
const oauthRoleRepository = require("../repositories/OauthRoleRepository");
const bcrypt = require("bcrypt");
const moment = require("moment");

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

    let dataDeleted = {};
    dataDeleted = getUserById;
    dataDeleted.dataValues.deleted_at = moment(Date.now())
      .format("YYYY-MM-DDTHH:mm:ss.sss[Z]")
      .toString();

    return {
      status: 200,
      message: "Success Deleted User",
      data: dataDeleted,
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

const getUsers = async (page) => {
  try {
    console.log(page, "page")
    let startAt = 0;
    let endAt = 10;
    if (page > 0) {
      startAt = 10 * page;
      endAt = (10 * page) + 10;
    }

    const users = await userRepository.findAllUser(startAt, endAt);
    const resultArr = {
      currentPage: parseInt(page + 1),
      totalPages: Math.ceil(users.total / 10),
      totalPerPage: 10,
      totalContent: parseInt(users.total),
      content: users.result,
    };

    return {
      status: 200,
      message: "Retrive Data Users",
      data: resultArr,
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
const getDetailUser = async ({ email, role }) => {
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
      data: {
        id: getUser.id,
        address: getUser.address,
        avatar: getUser.avatar,
        city: getUser.city,
        first_name: getUser.first_name,
        gmaps: getUser.gmaps,
        last_name: getUser.last_name,
        phone_number: getUser.phone_number,
        province: getUser.province,
        gender: getUser.gender,
        deleted_at: getUser.deleted_at,
        created_at: getUser.created_at,
        updated_at: getUser.updated_at,
        bank_account: getUser.bank_account,
        bank_name: getUser.bank_name,
        bank_username: getUser.bank_username,
        status: getUser.status,
        email: getUserId.email,
        role: role,
      },
    };
  } catch (error) {
    console.log(error);
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
  bank_account,
  bank_name,
  bank_username,
  status,
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
      last_name: last_name,
      phone_number: phone_number,
      province: province,
      gender: gender,
      avatar: avatar,
      status: status,
      bank_account: bank_account,
      bank_name: bank_name,
      bank_username: bank_username,
      updated_at: new Date(),
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

        const roleName = [];
        for (const iterator of role_id) {
          const getRole = await oauthRoleRepository.getById(iterator);
          roleName.push(getRole.dataValues.name);
        }

        return {
          status: 200,
          message: "Post User data success",
          data: {
            id: userId,
            profile_id: idProfile,
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
            updated_at: createProfile.updated_at,
            bank_account: createProfile.bank_account,
            bank_name: createProfile.bank_name,
            bank_username: createProfile.bank_username,
            status: createProfile.status,
            role_id: roleName,
            enabled: payloadCreateUser.enabled,
            not_expired: payloadCreateUser.not_expired,
            not_locked: payloadCreateUser.not_locked,
            credential_not_expired: payloadCreateUser.credential_not_expired,
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
    const getUser = await userRepository.getUserByAdmin(id);

    if (!getUser || getUser.length == 0) {
      return {
        status: 400,
        message: "User not found",
        data: null,
      };
    }
    return {
      status: 200,
      message: "Get User data success",
      data: getUser[0],
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const updateProfile = async ({
  email,
  address,
  avatar,
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
}) => {
  try {
    if (
      email == "" ||
      address == "" ||
      avatar == "" ||
      city == "" ||
      first_name == "" ||
      gmaps == "" ||
      last_name == "" ||
      phone_number == "" ||
      province == "" ||
      gender == "" ||
      bank_account == "" ||
      bank_name == "" ||
      bank_username == "" ||
      status == ""
    ) {
      return {
        status: 400,
        message: "Data cant be string empty, please fill the field",
        data: null,
      };
    }
    if (gender != null && gender != "FEMALE" && gender != "MALE") {
      return {
        status: 400,
        message: "Gender must be a FEMALE or MALE",
        data: null,
      };
    }
    const getUser = await oauthUserRepository.getUserByEmail({ email });
    if (!getUser) {
      return {
        status: 404,
        message: "Email Not Found",
        data: null,
      };
    } else {
      const profileId = getUser.profile_id;

      const updatedProfile = await userRepository.updateProfile({
        id: profileId,
        address: address,
        avatar: avatar,
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
        status: status,
        updated_at: new Date(),
      });
      if (!updatedProfile) {
        return {
          status: 404,
          message: "Can't update profil",
          data: null,
        };
      } else {
        const getProfile = await userRepository.getProfile(profileId);

        return {
          status: 200,
          message: "Success Update profile",
          data: getProfile,
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
module.exports = {
  getUsers,
  getDetailUser,
  createUser,
  deleteUser,
  getUserById,
  updateProfile,
};
