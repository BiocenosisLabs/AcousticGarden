import User from "../models/user";
import baseController from "../controllers";
import { userFields } from "../database/associations";

const options = {
  model: User,
  fields: [...userFields],
  fieldsProtected: [""],
};

function read(req, res, next) {
  baseController.read(options)(req, res, next);
}

function create(req, res, next) {
  req.body.username = req.body.email;
  baseController.create(options)(req, res, next);
}

export default {
  read,
  create,
};
