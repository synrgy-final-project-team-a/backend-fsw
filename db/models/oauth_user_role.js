'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oauth_user_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Oauth_user_role.init({
    user_id: DataTypes.BIGINT,
    role_id: DataTypes.BIGINT,
    created_at: DataTypes.NOW,
    updated_at: DataTypes.NOW
  }, {
    sequelize,
    modelName: 'Oauth_user_role',
  });
  return Oauth_user_role;
};