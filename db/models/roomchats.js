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
    seeker_id: DataTypes.INTEGER,
    tenant_id: DataTypes.INTEGER,
    kost_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'roomChats',
    tableName: 'room_chats',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return roomChats;
};