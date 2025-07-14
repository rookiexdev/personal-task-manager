import { Sequelize } from "sequelize-typescript";
import { UserModel } from "../models";
import config from "../config";

const DATABASE_URL = config.DATABASE_URL;

export const sequelize = new Sequelize(DATABASE_URL as string, {
  dialect: "postgres",
  models: [UserModel],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});
