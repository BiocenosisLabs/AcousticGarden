import express from "express";
import httpStatus from "http-status";

import { respondWithSuccess } from "../helpers/respond";
import APIError from "../helpers/errors";
import uploadsRouter from "./uploads";

const router = express.Router();

router.get("/", (req, res) => {
  respondWithSuccess(res);
});

router.use("/uploads", uploadsRouter);

router.use(() => {
  throw new APIError(httpStatus.NOT_FOUND);
});

export default router;
