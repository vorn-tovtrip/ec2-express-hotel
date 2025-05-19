import { z } from "zod";
import { SvcTypes } from "../../../types";
import { AmenitySchema } from "../amentities";

export const HotelBaseSchema = z.object({
  name: z.string().trim().nonempty(),
  location: z.string().trim().nonempty(),
  star: z.number().default(0).optional(),
  price: z
    .number()
    .nonnegative()
    .min(1, "Price must be highter then 1")
    .max(1000, "Price must be less then 1000"),
  hasBreakfast: z.boolean(),
  svcType: z
    .nativeEnum(SvcTypes)
    .refine((svctype) => svctype, "Svctype is required"),
});

export const HotelCreateSchema = HotelBaseSchema.extend({
  amentities: z
    .array(AmenitySchema)
    .nonempty("At least one amentities required"),
}).refine((hotel) => Object.keys(hotel).length, {
  message: "All fields are required",
});
