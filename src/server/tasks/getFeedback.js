import Queue from "bull";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { RECORDINGS_SUBFOLDER, UPLOAD_FOLDER_PATH } from "../routes/uploads";

import processor from "./processor";
import { redisUrl, redisOptions } from "../services/redis";
import { birdnetUrl } from "../config";
import Feedback from "../models/feedback";
import Spirit from "../models/spirit";

const getFeedback = new Queue("Generate feedback", redisUrl, {
  settings: redisOptions,
});

processor(getFeedback).process(async ({ data }) => {
  setTimeout(async () => {
    const form = new FormData();
    form.append(
      "audio",
      fs.createReadStream(
        `${UPLOAD_FOLDER_PATH}/${RECORDINGS_SUBFOLDER}/${data.filename}`
      )
    );
    form.append("meta", JSON.stringify({}));

    const config = {
      headers: {
        ...form.getHeaders(),
      },
    };

    const response = await axios
      .post(`${birdnetUrl}/analyze`, form, config)
      .catch((err) => console.log(err));

    const feedback = { ...data, species: response.data.results };
    feedback.quality = 1 + response.data.results.length;
    await Feedback.create(feedback);
    const spirit = await Spirit.findByPk(feedback.spiritId);
    let level = spirit.level;
    let xp = spirit.xp;
    if (isNaN(xp)) {
      xp = 0;
    }
    if ((xp + feedback.quality) / 10 > level) {
      level += 1;
    }
    return spirit.update({ xp: (xp += feedback.quality), level });
  }, 2000);
});

export default getFeedback;
