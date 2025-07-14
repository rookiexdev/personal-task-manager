import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes";
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
app.use(morgan("dev"));
app.use("/api/v1", routes);

export default app;
