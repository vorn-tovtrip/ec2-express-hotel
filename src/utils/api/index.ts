import { Request, Response } from "express";

export const handleResponse = <T>(
  res: Response,
  status = 200,
  message = "response has been sent",
  data: T
) => {
  return res.status(status).json({
    code: status,
    message,
    data,
  });
};
