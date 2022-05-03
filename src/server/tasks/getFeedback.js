import Queue from "bull";

import processor from "./processor";
import { redisUrl, redisOptions } from "../services/redis";
import Feedback from "../models/feedback";

const getFeedback = new Queue("Generate feedback", redisUrl, {
  settings: redisOptions,
});

processor(getFeedback).process(async ({ data }) => {
  setTimeout(() => {
    const feedback = { ...data };
    feedback.quality = Math.floor(Math.random() * 10) + 1;
    return Feedback.create(feedback);
  }, 2000);
});

export default getFeedback;
