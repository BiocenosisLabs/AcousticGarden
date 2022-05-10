import { DataTypes } from "sequelize";

import db from "../database";
//import { hashPassword, comparePasswords } from "../services/crypto";

const User = db.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    // validate: {
    //   isAlphanumeric: true,
    // },
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

export default User;
