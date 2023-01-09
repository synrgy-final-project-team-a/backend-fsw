'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Oauth_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      not_expired: {
        type: Sequelize.BOOLEAN
      },
      not_locked: {
        type: Sequelize.BOOLEAN
      },
      credential_not_expired: {
        type: Sequelize.BOOLEAN
      },
      enabled: {
        type: Sequelize.BOOLEAN
      },
      expired_verify_token: {
        type: Sequelize.DATE
      },
      otp: {
        type: Sequelize.STRING
      },
      otp_expired_date: {
        type: Sequelize.DATE
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      verify_token: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Oauth_users');
  }
};