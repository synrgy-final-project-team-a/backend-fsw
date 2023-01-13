const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_NAME,
    host: process.env.PG_HOST,
    dialect: "postgres",
    port: process.env.PG_PORT,
  },
  test: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_NAME,
    host: process.env.PG_HOST,
    dialect: "postgres",
    port: process.env.PG_PORT,
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_NAME,
    host: process.env.PG_HOST,
    dialect: "postgres",
    port: process.env.PG_PORT,
  },
};