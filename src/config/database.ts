import { Sequelize } from "sequelize-typescript";
import { User } from "../models";
import config from "../config";

const DATABASE_URL = config.DATABASE_URL;

export const sequelize = new Sequelize(DATABASE_URL as string, {
  dialect: "postgres",
  models: [User],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});
