import { Sequelize } from "sequelize-typescript";
import { User, Task } from "../models";
import config from "../config";

const DATABASE_URL = config.DATABASE_URL;

export const sequelize = new Sequelize(DATABASE_URL as string, {
  dialect: "postgres",
  models: [User, Task],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});
