'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chats.init({
    room_chat_id: DataTypes.INTEGER,
    sender_id: DataTypes.INTEGER,
    status_sender: DataTypes.STRING,
    message: DataTypes.TEXT,
    status_message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chats',
    tableName: 'chats',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return chats;
};