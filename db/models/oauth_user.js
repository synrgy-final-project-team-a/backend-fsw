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
      models.Oauth_user.belongsTo(models.Profile, {
        foreignKey: "profile_id",
      });
      models.Oauth_user.hasMany(models.Oauth_user_role, {
        foreignKey: "user_id",
      });
    }
  }
  Oauth_user.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      not_expired: DataTypes.BOOLEAN,
      not_locked: DataTypes.BOOLEAN,
      credential_not_expired: DataTypes.BOOLEAN,
      enabled: DataTypes.BOOLEAN,
      expired_verify_token: DataTypes.NOW,
      otp: DataTypes.STRING,
      otp_expired_date: DataTypes.NOW,
      password: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: false },
      verify_token: DataTypes.STRING,
      profile_id: DataTypes.BIGINT,
    },
    {
      timestamps: true,
      sequelize,
      modelName: "Oauth_user",
      tableName: "oauth_user",
       paranoid: true,
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Oauth_user;
};
