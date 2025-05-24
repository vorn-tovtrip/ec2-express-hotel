import compression from "compression";
import "reflect-metadata";

import session from "express-session";
import express, { NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import {
  catchAllErrorMiddleware,
  corsMiddleware,
  loggerMiddleware,
  notFoundMiddleWare,
} from "./middleware";
import mainRoute from "./routes";
import { handleResponse } from "./utils";

const createAppServer = () => {
  const app = express();
  app.set("trust proxy", true);
  app.use(
    session({
      saveUninitialized: false,
      resave: false,
      secret: "P@ss@123",
      proxy: process.env.NODE_ENV == "production" ? true : false,
      cookie: { secure: process.env.NODE_ENV == "production" ? true : false },
    })
  );
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(compression());
  app.use(express.json());
  const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: {
      status: 429,
      message: "Too many request, please try again later...",
    },
  });

  app.use(loggerMiddleware, corsMiddleware, morgan("dev"));
  app.use(globalRateLimit);
  app.get("/", (req: Request, res: Response) => {
    return res.redirect("https://expressjs.com/");
  });
  app.use("/health", (req: Request, res: Response, next: NextFunction) => {
    return handleResponse(res, 200, "success", {
      protocol: req.protocol,
      url: req.url,
    });
  });
  app.use("/api/v1/", mainRoute);
  app.use(notFoundMiddleWare);
  app.use(catchAllErrorMiddleware);
  return app;
};

export default createAppServer;
