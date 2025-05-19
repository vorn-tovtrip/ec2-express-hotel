import { NextFunction, Request, Response } from "express";
import ProfileController from "../../controller/profile.controller";
export const checkProfileExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  console.log("Checking if profile exist", id);
  const data = await ProfileController.findByIdOrExist(id);
  console.log(data);
  if (data) {
    return next();
  }
};
