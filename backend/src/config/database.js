import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize(
  isTest ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  isTest ? process.env.TEST_DB_USER : process.env.DB_USER,
  isTest ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD,
  {
    host: isTest ? process.env.TEST_DB_HOST : process.env.DB_HOST,
    port: isTest ? process.env.TEST_DB_PORT : process.env.DB_PORT,
    dialect: "postgres",
    logging: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export default sequelize;