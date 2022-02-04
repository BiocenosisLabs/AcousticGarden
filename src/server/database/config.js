require("dotenv").config();

let url = process.env.DATABASE_URL;

module.exports = {
  url: url || "localhost",
  dialect: process.env.DATABASE_DIALECT || "postgres",
  timezone: "+00:00",
  seederStorage: "sequelize",
};
