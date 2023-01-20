"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Oauth_user_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Oauth_user_role.belongsTo(models.Oauth_user, {
        foreignKey: "user_id",
      });
      models.Oauth_user_role.belongsTo(models.Oauth_role, {
        foreignKey: "role_id",
      });
    }
  }
  Oauth_user_role.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        foreignKey:"user_id",
      },
      role_id: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "Oauth_user_role",
      tableName: "oauth_user_role",
      timestamps: false,
    }
  );

  return Oauth_user_role;
};
