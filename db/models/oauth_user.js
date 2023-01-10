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
      models.Oauth_user.hasOne(models.Profile, {
        foreignKey: "user_id",
      });
    }
  }
  Oauth_user.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true },
      not_expired: DataTypes.BOOLEAN,
      not_locked: DataTypes.BOOLEAN,
      credential_not_expired: DataTypes.BOOLEAN,
      enabled: DataTypes.BOOLEAN,
      expired_verify_token: DataTypes.NOW,
      otp: DataTypes.STRING,
      otp_expired_date: DataTypes.NOW,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      verify_token: DataTypes.STRING,
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Oauth_user",
      tableName: "oauth_user",
    }
  );
  return Oauth_user;
};
