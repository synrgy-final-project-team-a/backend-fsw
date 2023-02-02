"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Profile.hasMany(models.Oauth_user, {
        foreignKey: "profile_id",
      });
    }
  }
  Profile.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      address: DataTypes.STRING,
      avatar: DataTypes.STRING,
      city: DataTypes.STRING,
      first_name: DataTypes.STRING,
      gmaps: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      gender: DataTypes.STRING,
      deleted_at: DataTypes.DATE,
      bank_account: DataTypes.STRING,
      bank_name: DataTypes.STRING,
      bank_username: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Profile",
      tableName: "profile",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Profile;
};
