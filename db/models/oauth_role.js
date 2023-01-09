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
    }
  }
  Oauth_role.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true },
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      created_at: DataTypes.NOW,
      updated_at: DataTypes.NOW,
    },
    {
      sequelize,
      modelName: "Oauth_role",
    }
  );
  return Oauth_role;
};
