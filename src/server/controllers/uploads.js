import httpStatus from "http-status";
import mime from "mime";

import Recording from "../models/recording";
import { RECORDINGS_SUBFOLDER, FIELD_NAME } from "../routes/uploads";
import { baseFileFields } from "../database/associations";
import { copyToUploadsDir, toFileUrl } from "../helpers/uploads";
import { filterResponseAll, respondWithSuccess } from "../helpers/respond";

async function uploadDocuments(req, res, next) {
  try {
    const files = req.files[FIELD_NAME];

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
        location: {
          type: "Point",
          coordinates: [req.body.longitude, req.body.latitude],
        },
      };
    });

    const response = await Recording.bulkCreate(fileEntries);

    respondWithSuccess(
      res,
      filterResponseAll(response, [...baseFileFields]),
      httpStatus.CREATED
    );
  } catch (error) {
    next(error);
  }
}

export default {
  uploadDocuments,
};
