import Queue from "bull";

import processor from "./processor";
import { redisUrl, redisOptions } from "../services/redis";
import Feedback from "../models/feedback";
import Spirit from "../models/spirit";

const getFeedback = new Queue("Generate feedback", redisUrl, {
  settings: redisOptions,
});

processor(getFeedback).process(async ({ data }) => {
  setTimeout(async () => {
    const feedback = { ...data };
    feedback.quality = Math.floor(Math.random() * 10) + 1;
    await Feedback.create(feedback);
    console.log(feedback);
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
