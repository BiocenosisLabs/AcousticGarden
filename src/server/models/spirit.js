import { DataTypes } from "sequelize";

import db from "../database";

const Spirit = db.define("spirit", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.GEOGRAPHY("POINT", 4326),
    allowNull: false,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  seed: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Spirit;
