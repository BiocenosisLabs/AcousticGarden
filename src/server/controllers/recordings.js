import httpStatus from "http-status";

import Recording from "../models/recording";
import baseController from "../controllers";
import { recordingFields } from "../database/associations";
import { filterResponseAll, respondWithSuccess } from "../helpers/respond";

const options = {
  model: Recording,
  fields: [...recordingFields],
  fieldsProtected: [""],
};

async function readAll(req, res, next) {
  try {
    let where = {};
    if (req.query.user) {
      where.userId = req.query.user;
    }
    if (req.query.spirit) {
      where.spiritId = req.query.spirit;
    }
    const response = await Recording.findAll({ where });
    console.log(response);
    respondWithSuccess(
      res,
      filterResponseAll(response, [...recordingFields]),
      httpStatus.SUCCESS
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
}

function read(req, res, next) {
  baseController.read(options)(req, res, next);
}

export default {
  read,
  readAll,
};
