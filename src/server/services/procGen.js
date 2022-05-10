import Spirit from "../models/spirit";

export async function generateSpirit(longitude, latitude) {
  const spirit = {
    name: "Cyril McSquirellson",
    description: "...",
    url: `${process.env.BASE_PATH}/api/static/images/cyril.jpg`,
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
