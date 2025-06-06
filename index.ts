import "reflect-metadata";
import { PostgresDataSource } from "./src/config";
import { AppEnv } from "./src/config/env";
import createAppServer from "./src/server";

PostgresDataSource.initialize().then(() => {
  const app = createAppServer();
  console.log("data base has been init");
  const server = app.listen(AppEnv.SERVERPORT, "0.0.0.0", async () => {
    // dbconnect();
    console.log("Welcome to express is startings", "Port", AppEnv.SERVERPORT);
    console.log("Cool");
  });
  server.on("connect", (req) => {
    console.log("Express js server is up running");
  });
  server.on("close", async () => {
    console.log("Express js servers is shutting downs");
  });
});
