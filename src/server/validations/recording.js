import { Joi, Segments } from "celebrate";

const defaultValidation = {
  user: Joi.number(),
  spirit: Joi.number(),
};

export default {
  search: {
    [Segments.QUERY]: {
      ...defaultValidation,
    },
  },
};
