import httpStatus from "http-status";

import Feedback from "../models/feedback";
import Spirit from "../models/spirit";
import baseController from "../controllers";
import { feedbackFields } from "../database/associations";
import {
  filterResponse,
  respondWithSuccess,
  respondWithError,
} from "../helpers/respond";

const options = {
  model: Feedback,
  fields: [...feedbackFields, "spirit"],
  fieldsProtected: [""],
};

async function search(req, res, next) {
  try {
    if (!req.query && !req.query.recording) {
      throw new Error();
    }
    const response = await Feedback.findOne({
      where: { recordingId: req.query.recording },
      include: { model: Spirit, as: "spirit" },
    });

    if (!response) {
      return respondWithError(
        res,
        { message: "Not Found" },
        httpStatus.NOT_FOUND
      );
    }
    respondWithSuccess(
      res,
      filterResponse(response, [...feedbackFields, "spirit"]),
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
