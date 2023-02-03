const oauthUserRepository = require("../../repositories/OauthUserRepository");
const oauthRoleRepository = require("../../repositories/OauthRoleRepository");
const userRepository = require("../../repositories/UserRepository");
const { asyncForEach, yup } = require("../../utils/tools");

const goToRoomChatValidation = yup.object({
  // file: yup.object({
  //   originalname: yup.string().required("Image must be required"),
  // }),
  body: yup
    .object({
      kostId: yup
        .string()
        .email()
        .required()
        .test(
          "kost_validations",
          "Kost Id Tidak Valid!",
          async function (value, key) {
            
            return true;
          }
        ),
    })
    .noUnknown(true),
});

module.exports = {
  goToRoomChatValidation
};
