"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../src/config/database.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.user_details = require("./profile.js")(sequelize, Sequelize);
db.oauth_user = require("./oauth_user.js")(sequelize, Sequelize);
db.oauth_user_role = require("./oauth_user_role.js")(sequelize, Sequelize);
db.oauth_role = require("./oauth_role")(sequelize, Sequelize);
db.chat = require("./chats")(sequelize, Sequelize);
db.roomChat = require("./roomchats")(sequelize, Sequelize);
db.kost = require("./kost")(sequelize, Sequelize);

module.exports = db;
