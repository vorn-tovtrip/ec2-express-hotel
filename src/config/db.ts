import { DataSource, DataSourceOptions } from "typeorm";
import { AppEnv } from "./env";
export const dbConfig: DataSourceOptions = {
  type: "postgres",
  host: AppEnv.POSTGRES_HOST,
  port: AppEnv.POSTGRES_PORT,
  username: AppEnv.POSTGRES_USER,
  password: AppEnv.POSTGRES_PASSWORD,
  database: AppEnv.POSTGRES_DATABASE,
  synchronize: process.env.NODE_ENV == "development" ? true : false,
  // synchronize: false,
  entities:
    process.env.NODE_ENV == "development"
      ? ["src/entity/**/*.ts"]
      : ["build/src/entity/**/*.js"],
  migrations:
    process.env.NODE_ENV == "development"
      ? ["src/migrations/**/*.ts"]
      : ["build/src/migrations/**/*.js"],
};

export const PostgresDataSource = new DataSource(dbConfig);
