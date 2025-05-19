import { Router } from "express";
import userController from "../controller/user.controller";
import { validationSchema } from "../middleware";
import {
  UserCreateProfileSchema,
  UserCreateSchema,
  UserUpdateSchema,
} from "../utils/schema/index";
const router = Router();
router
  .route("/")
  .get(userController.getUsers.bind(userController))
  .post(
    (req, res, next) => validationSchema(res, UserCreateSchema, req.body, next),
    userController.createUser.bind(userController)
  );
router
  .route("/:id")
  .get(userController.findUserId.bind(userController))
  .put(
    (req, res, next) => validationSchema(res, UserUpdateSchema, req.body, next),
    userController.updateUserId.bind(userController)
  )
  .delete(userController.deleteUserId.bind(userController));
router.post(
  "/profile",
  (req, res, next) =>
    validationSchema(res, UserCreateProfileSchema, req.body, next),
  userController.createNewUserProfile.bind(userController)
);

export default router;
