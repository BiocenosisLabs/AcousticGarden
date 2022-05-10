import express from "express";

import Feedback from "../models/feedback";
import feedbackController from "../controllers/feedback";
import resourcesMiddleware from "../middleware/resources";
import logger from "../middleware/logger";
import validate from "../services/validate";
import feedbackValidation from "../validations/feedback";

const router = express.Router();

const getFeedbackResource = resourcesMiddleware({
  model: Feedback,
});

router.get(
  "/",
  logger,
  validate(feedbackValidation.search),
  feedbackController.search
);

router.get("/:id", getFeedbackResource, feedbackController.read);

export default router;
