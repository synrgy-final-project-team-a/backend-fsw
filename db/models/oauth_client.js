"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Oauth_client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Oauth_client.hasMany(models.Oauth_role_path, {
        foreignKey: "client_id",
      });
    }
  }
  Oauth_client.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement:true },
      access_token_expired: DataTypes.INTEGER,
      approved: DataTypes.BOOLEAN,
      client_id: DataTypes.STRING,
      client_secret: DataTypes.STRING,
      grant_types: DataTypes.STRING,
      redirect_uris: DataTypes.STRING,
      refresh_token_expired: DataTypes.INTEGER,
      scopes: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Oauth_client",
    }
  );
  return Oauth_client;
};