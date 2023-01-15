const oauthUserRepository = require("../../repositories/OauthUserRepository");
const oauthRoleRepository = require("../../repositories/OauthRoleRepository");
const { asyncForEach, yup } = require('../../utils/tools');

const createUserValidation = yup.object({
    body: yup
      .object({
        email: yup
            .string()
            .email()
            .required()
            .test(
                'email_validations',
                'Email Already Exist, try another email!',
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
            "Role Not Exist", async function(value, key) {
                const roles = key.parent.role_id;
                let roleNotValid = [];
                await asyncForEach(roles, async element => {
                    let cekRole = await oauthRoleRepository.getById(element);
                    if (cekRole == null) roleNotValid.push(element);
                });

                if (roleNotValid.length > 0) return this.createError({message: `Roles ${roleNotValid} Not Valid`});
                return true;
            }
          )
          .required()
          .notRequired(),
        // email: yup.string().required(),
      })
      .noUnknown(true),
  });

module.exports = {
    createUserValidation
}