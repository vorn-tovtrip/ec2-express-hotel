import { Expose, Type } from "class-transformer";
import { UserDto } from "./user.dto";

export class ProfileDto {
  @Expose()
  id: number;

  @Expose()
  address: string;

  @Expose()
  gender: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
