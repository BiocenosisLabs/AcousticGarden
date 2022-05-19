import { Joi, Segments } from "celebrate";

const defaultValidation = {
  username: Joi.string().required(),
};

export default {
  create: {
    [Segments.BODY]: {
      ...defaultValidation,
    },
  },
};
