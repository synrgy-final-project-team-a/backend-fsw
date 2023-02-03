'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roomChats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  roomChats.init({
    seekerId: DataTypes.INTEGER,
    tenantId: DataTypes.INTEGER,
    kostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'roomChats',
  });
  return roomChats;
};