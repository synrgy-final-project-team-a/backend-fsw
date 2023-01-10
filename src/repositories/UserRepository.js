const models = require("../../db/models/index.js");
const UserDetails = models.user_details;

const findAllUser = async () => {
  return await UserDetails.findAll();
};
const getUserById = async ({ userId }) => {
  const getUser = await UserDetails.findOne({
    where: {
      user_id: userId,
    },
  });
  // console.log(getUser);
  return getUser;
};

// const findCarById = async (id) => {
//     return await Car.findByPk(id);
// };

// const saveCar = async (car) => {
//     return await Car.create(car);
// };

// const updateCar = async (car, carId) => {
//     return await Car.update(car, {wher:{id: carId}})
// }

// const destroyCar = async (carId) => {
//     await Car.destroy({
//         where: {id: carId}
//     });
// };

module.exports = { findAllUser, getUserById };
