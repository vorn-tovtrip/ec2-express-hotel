import { z } from "zod";
import { Gender } from "../../../types";

export const ProfileBaseSchema = z.object({
  address: z
    .string()
    .trim()
    .max(100, "Address must be less then 255")
    .nonempty(),
  gender: z.nativeEnum(Gender).refine((gender) => gender, {
    message: "Gender is required",
  }),
});
export const UpdateProfileSchema = ProfileBaseSchema.partial();
export const CreateProfileSchema = ProfileBaseSchema.refine(
  (args) => Object.keys(args).length > 0,
  {
    message: "Hotelfields must be required",
  }
);
