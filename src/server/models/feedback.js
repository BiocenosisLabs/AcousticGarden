import { DataTypes } from "sequelize";

import db from "../database";

const Feedback = db.define("feedback", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  quality: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  recordingId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  spiritId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  species: {
    type: DataTypes.JSONB,
  },
});

export default Feedback;
