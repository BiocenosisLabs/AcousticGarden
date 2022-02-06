import express from "express";

import Spirit from "../models/spirit";
import spiritsController from "../controllers/spirits";
import resourcesMiddleware from "../middleware/resources";

const router = express.Router();

const getSpiritResource = resourcesMiddleware({
  model: Spirit,
});

router.get("/", spiritsController.readAll);

router.get("/:id", getSpiritResource, spiritsController.read);

export default router;
