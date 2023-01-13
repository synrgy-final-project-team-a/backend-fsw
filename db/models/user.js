"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasOne(models.Profile, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "oauth_user",
      timestamps: false,
    }
  );
  return User;
};