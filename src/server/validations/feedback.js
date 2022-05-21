import { Joi, Segments } from "celebrate";

const defaultValidation = {
  user: Joi.number(),
  recording: Joi.number().required(),
};

export default {
  search: {
    [Segments.QUERY]: {
      ...defaultValidation,
    },
  },
};
