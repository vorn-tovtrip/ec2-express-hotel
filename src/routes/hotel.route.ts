import { Router } from "express";
import HotelController from "../controller/hotel.controller";
import { validationSchema } from "../middleware";
import { HotelCreateSchema } from "../utils/schema/hotel";

const router = Router();
router
  .route("/")
  .get(HotelController.findHotels.bind(HotelController))
  .post(
    (req, res, next) =>
      validationSchema(res, HotelCreateSchema, req.body, next),
    HotelController.createHotel.bind(HotelController)
  );
router.route("/:id").delete(HotelController.deleteHotel.bind(HotelController));
export default router;
