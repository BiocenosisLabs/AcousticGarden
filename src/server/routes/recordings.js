import express from "express";

import Recording from "../models/recording";
import recordingsController from "../controllers/recordings";
import resourcesMiddleware from "../middleware/resources";
import validate from "../services/validate";
import recordingsValidation from "../validations/recording";
import logger from "../middleware/logger";

const router = express.Router();

const getRecordingResource = resourcesMiddleware({
  model: Recording,
});

router.get(
  "/",
  logger,
  validate(recordingsValidation.search),
  recordingsController.readAll
);

router.get("/:id", getRecordingResource, recordingsController.read);

export default router;
