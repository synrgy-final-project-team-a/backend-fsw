const { sequelize, Sequelize } = require("../../db/models/index.js");
const models = require("../../db/models/index.js");
const kost = models.kost;

const getKostByKostId = async(kostId) =>{
    const getKost = await kost.findByPk(kostId)

    return getKost.dataValues;
}

module.exports = {getKostByKostId}