"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Oauth_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Oauth_user.init(
    {
      id: DataTypes.INTEGER,
      not_expired: DataTypes.BOOLEAN,
      not_locked: DataTypes.BOOLEAN,
      credential_not_expired: DataTypes.BOOLEAN,
      enabled: DataTypes.BOOLEAN,
      expired_verify_token: DataTypes.DATE,
      otp: DataTypes.STRING,
      otp_expired_date: DataTypes.DATE,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      verify_token: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Oauth_user",
    }
  );
  return Oauth_user;
};
