import { DataTypes } from "sequelize";

import db from "../database";
import { DOCUMENTS_SUBFOLDER } from "../routes/uploads";
import { removeFile } from "../helpers/uploads";

const Recording = db.define("recording", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.GEOGRAPHY("POINT", 4326),
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  spiritId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Recording.addHook("beforeDestroy", (file) => {
  return removeFile(file.url, DOCUMENTS_SUBFOLDER);
});

export default Recording;
