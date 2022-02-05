import User from "../models/user";
import Recording from "../models/recording";

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
