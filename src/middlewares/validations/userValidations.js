const oauthUserRepository = require("../../repositories/OauthUserRepository");
const oauthRoleRepository = require("../../repositories/OauthRoleRepository");
const { asyncForEach, yup } = require("../../utils/tools");

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const createUserValidation = yup.object({
  // file: yup.object({
  //   originalname: yup.string().required("Image must be required"),
  // }),
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
            console.log(value);
            const emailAlreadyExist = await oauthUserRepository.getUserByEmail({
              email: value,
            });
            return emailAlreadyExist == null;
          }
        ),
      password: yup.string().min(6).required().typeError("Minimal Passsword 6"),
      role_id: yup
        .array()
        .of(yup.number())
        .test(
          "role_id_validations",
          "Role Not Exist",
          async function (value, key) {
            const roles = key.parent.role_id;
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

module.exports = {
  createUserValidation,
};
