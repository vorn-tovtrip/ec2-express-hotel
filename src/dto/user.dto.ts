import { z } from "zod";
import { Expose, Type } from "class-transformer";
import { ProfileDto } from "./profile.dto";
import { UserCreateProfileSchema, UserCreateSchema } from "../utils/schema";
export type CreateUserDTO = z.infer<typeof UserCreateSchema>;
export type CreateProfileUserDTO = z.infer<typeof UserCreateProfileSchema>;

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  @Type(() => ProfileDto)
  profile: ProfileDto;
}
