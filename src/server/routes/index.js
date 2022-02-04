import express from "express";
import httpStatus from "http-status";

import { respondWithSuccess } from "../helpers/respond";
import APIError from "../helpers/errors";

const router = express.Router();

router.get("/", (req, res) => {
  respondWithSuccess(res);
});

router.use(() => {
  throw new APIError(httpStatus.NOT_FOUND);
});

export default router;
