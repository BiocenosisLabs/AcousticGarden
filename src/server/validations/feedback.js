import { Joi, Segments } from "celebrate";

const defaultValidation = {
  user: Joi.number().required(),
  recording: Joi.number().required(),
};

export default {
  search: {
    [Segments.QUERY]: {
      ...defaultValidation,
    },
  },
};
