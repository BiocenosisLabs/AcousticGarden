import express from "express";
import httpStatus from "http-status";

import { respondWithSuccess } from "../helpers/respond";
import APIError from "../helpers/errors";
import uploadsRouter from "./uploads";
import spiritsRouter from "./spirits";
import recordingsRouter from "./recordings";
import feedbackRouter from "./feedback";
import userRouter from "./user";

const router = express.Router();

router.get("/", (req, res) => {
  respondWithSuccess(res);
});

router.use("/uploads", uploadsRouter);

router.use("/spirits", spiritsRouter);

router.use("/recordings", recordingsRouter);

router.use("/feedback", feedbackRouter);

router.use("/users", userRouter);

router.use(() => {
  throw new APIError(httpStatus.NOT_FOUND);
});

export default router;
