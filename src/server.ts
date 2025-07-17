import app from "./app";
import config from "./config";
import { sequelize } from "./connections/sql";
import logger from "./utils/logger";

const PORT = config.PORT;

async function main() {
  try {
    sequelize
      .authenticate()
      .then(() => {
        logger.info("Connected to PostgreSQL");
        return sequelize.sync({ alter: true });
      })
      .then(() => {
        logger.info("Synced models");
        app.listen(PORT, () => {
          logger.info("Server running on port", PORT);
        });
      })
      .catch((err) => {
        logger.error(`Database connection failed: ${err}`);
      });
  } catch (error) {
    logger.error(`Database connection failed: ${error}`);
    process.exit(1);
  }
}

main();
