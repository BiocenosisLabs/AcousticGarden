import express from "express";

import Feedback from "../models/feedback";
import feedbackController from "../controllers/feedback";
import resourcesMiddleware from "../middleware/resources";

const router = express.Router();

const getFeedbackResource = resourcesMiddleware({
  model: Feedback,
});

router.get("/", feedbackController.search);

router.get("/:id", getFeedbackResource, feedbackController.read);

export default router;
