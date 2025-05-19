import { Router } from "express";
import profileController from "../controller/profile.controller";
import { checkProfileExist } from "../middleware";
const router = Router();
router.route("/").get(profileController.getUsers.bind(profileController)).post(
  // (req, res, next) => validationSchema(res, UserCreateSchema, req.body, next),
  profileController.createProfileUser.bind(profileController)
);
router
  .route("/:id")
  .put(
    checkProfileExist,
    profileController.updateProfileByd.bind(profileController)
  )
  .delete(profileController.deleteProfileById.bind(profileController));

export default router;
