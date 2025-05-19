import { z } from "zod";
import { HotelCreateSchema } from "../utils/schema/hotel";

export type CreateHotelDto = z.infer<typeof HotelCreateSchema>;
