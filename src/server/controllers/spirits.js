import httpStatus from "http-status";

import Spirit from "../models/spirit";
import baseController from "../controllers";
import { spiritFields } from "../database/associations";
import { generateSpirit } from "../services/procGen";
import db from "../database";
import { filterResponseAll, respondWithSuccess } from "../helpers/respond";

const options = {
  model: Spirit,
  fields: [...spiritFields],
  fieldsProtected: [""],
};

export const findSpirits = async (longitude, latitude, radius) => {
  if (!longitude || !latitude) return [];
  const sql = `SELECT id, name, url, level, seed, description, location FROM spirits
    WHERE (
      ST_DWithin(
        ST_SetSRID(ST_Point(${longitude}, ${latitude}),4326),
        spirits.location,
        ${radius}
      )
    );`;
  let [spirits] = await db.query(sql);
  return spirits;
};

export const findOrGenerateSpirit = async (longitude, latitude) => {
  let spirits = await findSpirits(longitude, latitude, 500);
  if (spirits.length === 0) {
    spirits = [await generateSpirit(longitude, latitude)];
  }
  return spirits[Math.floor(Math.random() * spirits.length)];
};

async function readAll(req, res, next) {
  try {
    const response = await findSpirits(
      req.query.longitude,
      req.query.latitude,
      5000
    );
    respondWithSuccess(
      res,
      filterResponseAll(response, [...spiritFields]),
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
