import User from "../models/user";
import Recording from "../models/recording";
import Spirit from "../models/spirit";

export const baseFileFields = ["fileName", "fileType", "url"];

export const UserHasManyRecordings = User.hasMany(Recording, {
  foreignKey: "userId",
  as: "recordings",
});

export const RecordingBelongsToUser = Recording.belongsTo(User, {
  allowNull: true,
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
  as: "user",
});

export const SpiritHasManyRecordings = User.hasMany(Recording, {
  foreignKey: "spiritId",
  as: "recordings",
});

export const RecordingBelongsToSpirit = Recording.belongsTo(Spirit, {
  allowNull: true,
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
  as: "spirit",
});
