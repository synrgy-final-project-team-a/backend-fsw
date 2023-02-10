const auth = require("../middlewares/authorization");
const axios = require("axios");
const path = require("path");
const app = require("../../server");
const userRepository = require("../repositories/UserRepository");
const oauthUserRepository = require("../repositories/OauthUserRepository");
const oauthUserRoleRepository = require("../repositories/OauthUserRoleRepository");
const request = require("supertest");

describe("POST Test endpoint /api/user/create", () => {
  it("Should be response 201 as status code", async () => {
    const fileImage = path.join(__dirname, "../uploads/synrgy_logo.jpg");
    const payloadLogin = {
      email: "superadmin@mail.com",
      password: "password",
    };

    const payloadUser = {
      email: "raihanpambagyo@gmail",
      password: "P@ssw0rd",
      role_id: "1,2,3",
      address: "Jalan Raya",
      city: "Bekasi",
      first_name: "Raihan",
      gmaps: "https://goo.gl/maps/NSC7JpqCisjUHUxz5",
      last_name: "Fadhila",
      phone_number: "081380209380",
      province: "JAWA BERAT",
      gender: "MALE",
      avatar: fileImage,
      bank_account: "6043214280",
      bank_name: "BCA",
      bank_username: "Raihan Pambagyo Fadhila",
      status: "Karyawan",
    };

    const loginAdmin = await axios
      .post(
        "https://authentication-service-production.up.railway.app/api/login-superadmin",
        payloadLogin
      )
      .then((res) => {
        return res.data.access_token;
      });

    const Token = loginAdmin;
    console.log(Token, "kkll");

    return request(app)
      .post("/api/user/create")
      .set("Authorization", `Bearer ${Token}`)
      .field("email", payloadUser.email)
      .field("password", payloadUser.password)
      .field("role_id", payloadUser.role_id)
      .field("address", payloadUser.address)
      .field("city", payloadUser.city)
      .field("first_name", payloadUser.first_name)
      .field("gmaps", payloadUser.gmaps)
      .field("last_name", payloadUser.last_name)
      .field("province", payloadUser.province)
      .field("gender", payloadUser.gender)
      .field("avatar", payloadUser.avatar)
      .field("bank_account", payloadUser.bank_account)
      .field("bank_name", payloadUser.bank_name)
      .field("bank_username", payloadUser.bank_username)
      .field("status", payloadUser.status)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.data).not.toEqual(null);

        userRepository.deleteUser(res.body.data.id);
        oauthUserRepository.deletedUser(res.body.data.id);
        oauthUserRoleRepository.deletedUserRole(res.body.data.id);
      });
  });
});

describe("Test get by id superadmmin endpoint /api/user/detail/:id", () => {
  it("Should be response 200 as status code", async () => {
    const payloadLogin = {
      email: "superadmin@mail.com",
      password: "password",
    };

    const loginAdmin = await axios
      .post(
        "https://authentication-service-production.up.railway.app/api/login-superadmin",
        payloadLogin
      )
      .then((res) => {
        return res.data.access_token;
      });

    const Token = loginAdmin;
    // console.log(Token, "kkll");

    return request(app)
      .get(`/api/user/detail/${4}`)
      .set("Authorization", `Bearer ${Token}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.data).not.toEqual(null);
      });
  }, 30000);
});

describe("Test get profile endpoint /api/user/detail", () => {
  it("Should be response 200 as status code", async () => {
    const payloadLogin = {
      email: "tennant@mail.com",
      password: "password",
    };

    const loginAdmin = await axios
      .post(
        "https://authentication-service-production.up.railway.app/api/login-tennant",
        payloadLogin
      )
      .then((res) => {
        return res.data.access_token;
      });

    const Token = loginAdmin;
    // console.log(Token, "kkll");

    return request(app)
      .get(`/api/user/detail`)
      .set("Authorization", `Bearer ${Token}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.data).not.toEqual(null);
      });
  }, 30000);
});
