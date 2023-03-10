const oauthUserRepository = require("../../repositories/OauthUserRepository");
const oauthRoleRepository = require("../../repositories/OauthRoleRepository");
const userRepository = require("../../repositories/UserRepository");
const { asyncForEach, yup } = require('../../utils/tools');

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const createUserValidation = yup.object({
  file: yup.object({
    originalname: yup.string().required("Image must be required"),
  }),
  body: yup
    .object({
      email: yup
        .string()
        .email()
        .required()
        .test(
          "email_validations",
          "Email Already Exist, try another email!",
          async function (value, key) {
            const emailAlreadyExist = await oauthUserRepository.getUserByEmailWhereNotDeleted(value);
            if(emailAlreadyExist.length > 0) return false;
            return true;
          }
        ),
      password: yup.string().min(6).required().typeError("Minimal Passsword 6"),
      role_id: yup
        .string()
        .required()
        .test(
          "role_id_validations",
          "Role Not Exist",
          async function (value, key) {
            const roles = key.parent.role_id.split(",");
            let roleNotValid = [];
            await asyncForEach(roles, async (element) => {
              let cekRole = await oauthRoleRepository.getById(element);
              if (cekRole == null) roleNotValid.push(element);
            });

            if (roleNotValid.length > 0)
              return this.createError({
                message: `Roles ${roleNotValid} Not Valid`,
              });
            return true;
          }
        )
        .required()
        .notRequired(),
      address: yup
        .string()
        .required()
        .typeError("Address must be type string."),
      city: yup.string().required("City must be required."),
      first_name: yup.string().required("First name must be required"),
      gmaps: yup.string().nullable(),
      last_name: yup.string().required("Last name must be required."),
      phone_number: yup.string().required("Phone number must be required"),
      province: yup.string().required("Province must be required."),
      gender: yup.string().required("Gender must be required."),
    })
    .noUnknown(true),
});

const deleteUserValidation = yup.object({
  params: yup.object({
    id: yup.number().required().test(
      "user_id_validations",
      "Id Not Exist", async function(value, key) {
        const getUserById = await userRepository.getUserById(value);
        if (getUserById == null) return this.createError({message: `User Profile With Id ${value} Is Not Exist`});
        return true;
      }
    ),
  }),
})

module.exports = {
    createUserValidation, deleteUserValidation
}
