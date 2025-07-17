import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "./routes";
import logger from "./middleware/logger.middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [],
    credentials: true,
  })
);
app.use(logger);
app.use("/api/v1", routes);

export default app;
