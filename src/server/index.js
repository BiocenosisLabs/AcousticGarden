import path from "path";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import methodOverride from "method-override";

import router from "./routes";
import db from "./database";

const { port } = require("./config");

const imagesDir = path.join(__dirname, "static");

// Check database connection
db.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully");
  })
  .catch(() => {
    console.log("Unable to connect to database");
    process.exit(1);
  });

// Initialize express instance
const app = express();
app.set("port", port);

// Configure view engine
app.set("view engine", "pug");
app.set("views", __dirname);

// Use HTTP middlewares
app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());

// Configure CORS
const dev = new URL("http://localhost:3000");
const prod = new URL("https://acoustic.land");

app.use(
  cors({
    origin: [
      dev.hostname,
      new RegExp(`.${dev.hostname}`, "i"),
      prod.hostname,
      new RegExp(`.${prod.hostname}`, "i"),
    ],
    allowedHeaders: [
      "Authorization",
      "Content-Length",
      "Content-Type",
      "Origin",
    ],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

// Configure HTTP headers / CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        baseUri: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        objectSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        fontSrc: ["'self'"],
        formAction: ["'self'"],
        connectSrc: ["'self'"],
      },
    },
  })
);

// Mount static files
app.use("/api/static", express.static(imagesDir));

// Mount all routes
app.use("/api", router);

const server = app.listen(port, async (err) => {
  if (err) console.error(err);
  else console.log(`Server up on ${port}`);
});

process.on("SIGINT", () => {
  server.close();
  console.log("closed server");
});
