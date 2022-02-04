import { DataTypes } from "sequelize";

import db from "../database";
import { hashPassword, comparePasswords } from "../services/crypto";

const BCRYPT_HASH_LENGTH = 60;

const User = db.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  slug: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isAlphanumeric: true,
    },
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(BCRYPT_HASH_LENGTH),
    allowNull: false,
    validate: {
      len: BCRYPT_HASH_LENGTH,
    },
  },
});

User.addHook("beforeValidate", async (user) => {
  if (user.password) {
    user.password = await hashPassword(user.password);
  }
});

User.prototype.comparePasswords = async function (password) {
  return await comparePasswords(password, this.password);
};

export default User;
