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
      id: { type: DataTypes.BIGINT, primaryKey: true },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      avatar: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      gmaps: DataTypes.STRING,
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Profile",
      tableName: "profile",
      timestamps: false,
    }
  );
  return Profile;
};
