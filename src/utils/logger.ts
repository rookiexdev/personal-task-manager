import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";

const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const filterOnly = (level: string) =>
  format((info) => (info.level === level ? info : false))();

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: path.join(logDir, "error.log"),
      format: format.combine(filterOnly("error")),
    }),
    new transports.File({
      filename: path.join(logDir, "info.log"),
      format: format.combine(filterOnly("info")),
    }),
    new transports.File({
      filename: path.join(logDir, "debug.log"),
      format: format.combine(filterOnly("debug")),
    }),
  ],
});

export default logger;
