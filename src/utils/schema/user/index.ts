import { z } from "zod";
import { ProfileBaseSchema } from "../profile";

export const UserBaseSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Email is required")
    .max(255, "Email must be less then 255")
    .nonempty(),
  password: z
    .string()
    .trim()
    .max(50, "Password must be less then 50")
    .min(4, "Password must be over 4 characters")
    .nonempty(),

  firstName: z
    .string()
    .trim()
    .max(50, "firstName must be less then 50")
    .min(4, "firstName must be over 4 characters")
    .nonempty(),
  lastName: z
    .string()
    .trim()
    .max(50, "lastName must be less then 50")
    .min(4, "lastName must be over 4 characters")
    .nonempty(),
});
const UserProfileBaseSchema = ProfileBaseSchema.merge(UserBaseSchema);
export const UserUpdateSchema = UserBaseSchema.partial();
export const UserCreateSchema = UserBaseSchema.refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided",
  }
);
export const UserEmailSchema = UserBaseSchema.pick({ email: true });
export const UserCreateProfileSchema = UserProfileBaseSchema.refine(
  (args) => Object.keys(args).length,
  {
    message: "One or more field is required",
  }
);
