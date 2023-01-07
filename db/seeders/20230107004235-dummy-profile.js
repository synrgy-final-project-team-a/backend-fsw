"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Profiles", [
      {
        first_name: "Fajar",
        last_name: "sadboi",
        phone_number: "082260307011",
        avatar:
          "https://res.cloudinary.com/dgswqbhcm/image/upload/v1672301613/jcigg0dycm5fy9lw8do2.jpg",
        province: "GORONTALO",
        city: "KABUPATEN GORONTALO",
        address: "jl. Boalemo raya no.12 Kab. Gorontalo, 17878",
        gmaps: "https://goo.gl/maps/QXh6QbcT2XXHbrnS9",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete("Profiles", null, {});
  },
};
