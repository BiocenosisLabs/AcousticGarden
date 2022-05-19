import httpStatus from "http-status";

import User from "../models/user";
import baseController from "../controllers";
import { userFields } from "../database/associations";
import { filterResponse, respondWithSuccess } from "../helpers/respond";

const options = {
  model: User,
  fields: [...userFields],
  fieldsProtected: [""],
};

function read(req, res, next) {
  baseController.read(options)(req, res, next);
}

async function create(req, res, next) {
  const user = await User.findOne({ where: { username: req.body.username } })
  if (user) {
    return respondWithSuccess(
      res,
      filterResponse(user, [...userFields]),
      httpStatus.SUCCESS
    );
  }
  baseController.create(options)(req, res, next);
}

export default {
  read,
  create,
};
