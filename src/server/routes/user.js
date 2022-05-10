import express from "express";

import User from "../models/user";
import userController from "../controllers/user";
import resourcesMiddleware from "../middleware/resources";
import logger from "../middleware/logger";
import validate from "../services/validate";
import userValidation from "../validations/user";

const router = express.Router();

const getUserResource = resourcesMiddleware({
  model: User,
});

router.post(
  "/signup",
  logger,
  validate(userValidation.create),
  userController.create
);

router.get("/:id", getUserResource, userController.read);

export default router;
