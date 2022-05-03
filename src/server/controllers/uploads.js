import httpStatus from "http-status";
import mime from "mime";

import Recording from "../models/recording";
import { RECORDINGS_SUBFOLDER, FIELD_NAME } from "../routes/uploads";
import { baseFileFields } from "../database/associations";
import { copyToUploadsDir, toFileUrl } from "../helpers/uploads";
import { filterResponseAll, respondWithSuccess } from "../helpers/respond";
import { findOrGenerateSpirit } from "../controllers/spirits";
import submitJob from "../tasks/submitJob";
import getFeedback from "../tasks/getFeedback";

async function uploadDocuments(req, res, next) {
  try {
    const files = req.files[FIELD_NAME];

    const { id, name, url } = await findOrGenerateSpirit(
      req.body.longitude,
      req.body.latitude
    );

    // Move all files to /uploads folder to make them public
    for (let file of files) {
      await copyToUploadsDir(file.path, file.filename, RECORDINGS_SUBFOLDER);
    }

    // Convert image data to database model format
    const fileEntries = files.map((file) => {
      return {
        fileName: file.filename,
        fileType: mime.getExtension(file.mimetype),
        url: toFileUrl(file.path, RECORDINGS_SUBFOLDER),
        userId: parseInt(req.body.user),
        spiritId: id,
        location: {
          type: "Point",
          coordinates: [req.body.longitude, req.body.latitude],
        },
      };
    });

    const response = await Recording.bulkCreate(fileEntries);

    response.map((res) => {
      submitJob(getFeedback, `${res.dataValues.id}`, {
        userId: parseInt(req.body.user),
        spiritId: id,
        recordingId: res.dataValues.id,
      });
    });

    respondWithSuccess(
      res,
      filterResponseAll(
        response.map((res) => {
          return { ...res.dataValues, spirit: { id, name, url } };
        }),
        [...baseFileFields, "spirit"]
      ),
      httpStatus.CREATED
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export default {
  uploadDocuments,
};
