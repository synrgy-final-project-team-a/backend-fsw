"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Oauth_clients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      access_token_expired: {
        type: Sequelize.INTEGER,
      },
      approved: {
        type: Sequelize.BOOLEAN,
      },
      client_id: {
        type: Sequelize.STRING,
      },
      client_secret: {
        type: Sequelize.STRING,
      },
      grant_types: {
        type: Sequelize.STRING,
      },
      redirect_uris: {
        type: Sequelize.STRING,
      },
      refresh_token_expired: {
        type: Sequelize.INTEGER,
      },
      scopes: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Oauth_clients");
  },
};
