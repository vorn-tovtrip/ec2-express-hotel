import { Router } from "express";
import amentitiesController from "../controller/amentities.controller";
import { validationSchema } from "../middleware";
import { CreateAmentitiesSchema } from "../utils/schema/amentities";

const router = Router();
router
  .route("/")
  .get(amentitiesController.findAllAmentities.bind(amentitiesController))
  .post(
    (req, res, next) =>
      validationSchema(res, CreateAmentitiesSchema, req.body, next),
    amentitiesController.createAmentities.bind(amentitiesController)
  );
router
  .route("/:id")
  .delete(
    amentitiesController.deleteSingleAmentities.bind(amentitiesController)
  );
export default router;
