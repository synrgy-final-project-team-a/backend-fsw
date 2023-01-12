"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Oauth_client_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Oauth_client_role.belongsTo(models.Oauth_user_role, {
        foreignKey: "role_id",
      });
      models.Oauth_client_role.belongsTo(models.Oauth_client, {
        foreignKey: "client_id",
      });
    }
  }
  Oauth_client_role.init(
    {
      client_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement:true },
      role_id: { type: DataTypes.BIGINT, primaryKey: true },
      created_at: DataTypes.NOW,
      updated_at: DataTypes.NOW,
    },
    {
      sequelize,
      modelName: "Oauth_client_role",
    }
  );
  return Oauth_client_role;
};