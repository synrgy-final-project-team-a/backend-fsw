"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Oauth_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Oauth_role.hasMany(models.Oauth_user_role, {
        foreignKey: "role_id",
      });
      models.Oauth_role.hasMany(models.Oauth_client_role, {
        foreignKey: "role_id",
      });
      models.Oauth_role.hasMany(models.Oauth_role_path, {
        foreignKey: "role_id",
      });
    }
  }
  Oauth_role.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement:true },
      name: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Oauth_role",
      tableName: "oauth_role",
      timestamps: false
    }
  );
  return Oauth_role;
};