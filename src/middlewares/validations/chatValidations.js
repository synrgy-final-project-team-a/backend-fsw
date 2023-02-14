const oauthUserRepository = require("../../repositories/OauthUserRepository");
const oauthRoleRepository = require("../../repositories/OauthRoleRepository");
const userRepository = require("../../repositories/UserRepository");
const kostRepository = require("../../repositories/KostRepository");
const roomChatRepository = require("../../repositories/RoomChatRepository");
const { asyncForEach, yup } = require("../../utils/tools");

const goToRoomChatValidation = yup.object({
  body: yup
    .object({
      kostId: yup
        .number()
        .required()
        .test(
          "kost_validations",
          "Kost Id Tidak Valid!",
          async function (value, key) {
            const findKosById = await kostRepository.getKostByKostId(value);

            if (findKosById == null) return false;
            return true;
          }
        ),
    })
    .noUnknown(true),
});

const loadChatValidation = yup.object({
  body: yup
    .object({
      roomId: yup
        .number()
        .required()
        .test(
          "kost_validations",
          "Kost Id Tidak Valid!",
          async function (value, key) {
            const findRoomById = await roomChatRepository.findRoomById(value);

            if (findRoomById == null) return false;
            return true;
          }
        ),
    })
    .noUnknown(true),
});

module.exports = {
  goToRoomChatValidation, loadChatValidation
};
