import Spirit from "../models/spirit";
import { names, traits, types } from "../static/spirits.json";

// const normalize = (val, max, min) => {
//   return (val - min) / (max - min);
// };

const scale = (val, max, min) => {
  return ((max - min) * (val - 0)) / (1 - 0) + min;
};

const generateName = () => {
  return names[Math.round(scale(Math.random(), names.length - 1, 0))];
};

const generateTraits = () => {
  return `${traits[Math.round(scale(Math.random(), traits.length - 1, 0))]}, ${traits[Math.round(scale(Math.random(), traits.length - 1, 0))]}, ${traits[Math.round(scale(Math.random(), traits.length - 1, 0))]}, ${traits[Math.round(scale(Math.random(), traits.length - 1, 0))]}`; // eslint-disable-line
};

const generateType = () => {
  return types[Math.round(scale(Math.random(), types.length - 1, 0))];
};

export async function generateSpirit(longitude, latitude) {
  const spirit = {
    name: generateName(),
    description: generateTraits(),
    url: `${process.env.BASE_PATH}/api/static/images/cyril.jpg`,
    type: generateType(),
    level: 0,
    xp: 0,
    seed: `${Date.now()}-${longitude}-${latitude}`,
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  };
  return Spirit.create(spirit);
}
