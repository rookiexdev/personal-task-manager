import app from "./app";
import config from "./config";
import { sequelize } from "./config/database";

const PORT = config.port;

async function main() {
  try {
    sequelize
      .authenticate()
      .then(() => {
        console.log("Connected to PostgreSQL (Neon)");
        return sequelize.sync({ alter: true });
      })
      .then(() => {
        console.log("Synced models");
        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
      })
      .catch((err) => {
        console.error("DB connection failed:", err);
      });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();
