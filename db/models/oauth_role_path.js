"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Oauth_role_path extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Oauth_role_path.init(
    {
      id: DataTypes.INTEGER,
      method: DataTypes.STRING,
      name: DataTypes.STRING,
      pattern: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Oauth_role_path",
    }
  );
  return Oauth_role_path;
};
