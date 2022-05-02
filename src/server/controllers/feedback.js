import httpStatus from "http-status";

import Feedback from "../models/feedback";
import baseController from "../controllers";
import { feedbackFields } from "../database/associations";
import { filterResponseAll, respondWithSuccess } from "../helpers/respond";

const options = {
  model: Feedback,
  fields: [...feedbackFields],
  fieldsProtected: [""],
};

async function search(req, res, next) {
  try {
    const response = {};
    respondWithSuccess(
      res,
      filterResponseAll(response, [...feedbackFields]),
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
  search,
};
