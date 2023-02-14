"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kost.init(
    {
      kost_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      additional_notes: DataTypes.TEXT,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      created_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
      description: DataTypes.TEXT,
      dispenser: DataTypes.BOOLEAN,
      drying_ground: DataTypes.BOOLEAN,
      electric: DataTypes.BOOLEAN,
      enabled: DataTypes.BOOLEAN,
      front_building_photo: DataTypes.TEXT,
      front_farbuilding_photo: DataTypes.TEXT,
      gmaps: DataTypes.TEXT,
      kitchen: DataTypes.BOOLEAN,
      kost_tv: DataTypes.BOOLEAN,
      kost_type_man: DataTypes.BOOLEAN,
      kost_type_mixed: DataTypes.BOOLEAN,
      kost_type_woman: DataTypes.BOOLEAN,
      laundry: DataTypes.BOOLEAN,
      living_room: DataTypes.BOOLEAN,
      location_additional_notes: DataTypes.TEXT,
      parking_car: DataTypes.BOOLEAN,
      parking_motorcycle: DataTypes.BOOLEAN,
      pic: DataTypes.STRING,
      pic_phone_number: DataTypes.STRING,
      province: DataTypes.STRING,
      refrigerator: DataTypes.BOOLEAN,
      updated_at: DataTypes.DATE,
      water: DataTypes.BOOLEAN,
      wifi: DataTypes.BOOLEAN,
      year_since: DataTypes.STRING,
      profile_id: DataTypes.BIGINT,
      rule_id: DataTypes.BIGINT,
      kost_name: DataTypes.STRING,
      available_room: DataTypes.INTEGER,
      front_road_photo: DataTypes.TEXT,
      parking: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Kost",
      tableName: "kost",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Kost;
};
