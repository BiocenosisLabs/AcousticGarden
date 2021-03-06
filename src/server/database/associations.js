import User from "../models/user";
import Recording from "../models/recording";
import Spirit from "../models/spirit";
import Feedback from "../models/feedback";

export const baseFileFields = ["fileName", "fileType", "url"];

export const spiritFields = [
  "id",
  "name",
  "description",
  "url",
  "level",
  "xp",
  "seed",
  "latitude",
  "longitude",
];

export const recordingFields = [
  "id",
  "fileType",
  "fileName",
  "url",
  "userId",
  "spiritId",
  "latitude",
  "longitude",
];

export const feedbackFields = [
  "id",
  "quality",
  "userId",
  "recordingId",
  "species",
];

export const userFields = ["id", "username", "email"];

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

export const SpiritHasManyRecordings = Spirit.hasMany(Recording, {
  foreignKey: "spiritId",
  as: "recordings",
});

export const RecordingBelongsToSpirit = Recording.belongsTo(Spirit, {
  allowNull: true,
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
  as: "spirit",
});

export const FeedbackBelongsToSpirit = Feedback.belongsTo(Spirit, {
  allowNull: true,
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
  as: "spirit",
});
