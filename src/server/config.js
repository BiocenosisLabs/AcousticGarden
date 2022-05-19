const DEFAULT_PORT = 8080;
const port = process.env.PORT || DEFAULT_PORT;

const dbName = process.env.DB_NAME || "test.db";

const basePath = process.env.BASE_PATH || "";

const birdnetUrl = process.env.BIRDNET_URL || "http://localhost:8080";

module.exports = {
  port,
  dbName,
  basePath,
  birdnetUrl,
};
