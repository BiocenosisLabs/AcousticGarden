import httpStatus from "http-status";
import mime from "mime";

import Recording from "../models/recording";
import { RECORDINGS_SUBFOLDER, FIELD_NAME } from "../routes/uploads";
import { baseFileFields } from "../database/associations";
import { copyToUploadsDir, toFileUrl } from "../helpers/uploads";
import { filterResponseAll, respondWithSuccess } from "../helpers/respond";
import { generateSpirit } from "../services/procGen";
import db from "../database";

const findOrGenerateSpirits = async (longitude, latitude) => {
  if (!longitude || !latitude) return;
  const sql = `SELECT id, name FROM spirits
    WHERE (
      ST_DWithin(
        ST_SetSRID(ST_Point(${longitude}, ${latitude}),4326),
        spirits.location,
        5000
      )
    );`;
  let [spirits] = await db.query(sql);
  if (spirits.length === 0) {
    spirits = [await generateSpirit(longitude, latitude)];
  }
  return spirits[Math.floor(Math.random() * spirits.length)];
};

async function uploadDocuments(req, res, next) {
  try {
    const files = req.files[FIELD_NAME];

    const spirit = await findOrGenerateSpirits(
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
        spiritId: spirit.id,
        location: {
          type: "Point",
          coordinates: [req.body.longitude, req.body.latitude],
        },
      };
    });

    const response = await Recording.bulkCreate(fileEntries);

    respondWithSuccess(
      res,
      filterResponseAll(
        response.map((res) => {
          return { ...res.dataValues, spirit };
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
