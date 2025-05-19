import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { handleResponse } from "../utils";
import { EntityPropertyNotFoundError } from "typeorm";
import CustomError from "../utils/error";

const catchAllErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Catch all error middleware run", err);
  if (err instanceof EntityPropertyNotFoundError) {
    return handleResponse(res, 400, "database schema", err.message);
  }
  if (err instanceof ZodError) {
    return handleResponse(res, 400, "validation", err);
  }

  if (err instanceof CustomError) {
    return handleResponse(res, err.statusCode, "validation", err);
  }

  return handleResponse(res, 500, "unknown", err?.message);
};
export default catchAllErrorMiddleware;
