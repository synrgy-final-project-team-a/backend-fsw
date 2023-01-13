"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Oauth_client_roles", {
      client_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Oauth_client_roles");
  },
};