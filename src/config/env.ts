import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env",
});
export const AppEnv = {
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE!,
  POSTGRES_USER: process.env.POSTGRES_USER!,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,
  POSTGRES_HOST: process.env.POSTGRES_HOST!,
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT || 3306),
  SERVERPORT: Number(process.env.SERVERPORT || 3000),
};
