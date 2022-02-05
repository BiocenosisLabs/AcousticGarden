import { DataTypes } from "sequelize";

import db from "../database";
import { DOCUMENTS_SUBFOLDER } from "../routes/uploads";
import { removeFile } from "../helpers/uploads";

const Recording = db.define("spirit", {
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

Recording.addHook("beforeDestroy", (file) => {
  return removeFile(file.url, DOCUMENTS_SUBFOLDER);
});

export default Recording;
