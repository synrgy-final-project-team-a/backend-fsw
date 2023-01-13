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
      models.Oauth_role_path.belongsTo(models.Oauth_role, {
        foreignKey: "role_id",
      });
    }
  }
  Oauth_role_path.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement:true },
      method: DataTypes.STRING,
      name: DataTypes.STRING,
      pattern: DataTypes.STRING,
      role_id: DataTypes.BIGINT,
      created_at: DataTypes.NOW,
      updated_at: DataTypes.NOW,
    },
    {
      sequelize,
      modelName: "Oauth_role_path",
    }
  );
  return Oauth_role_path;
};