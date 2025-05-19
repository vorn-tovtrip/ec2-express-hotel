import { CreateHotelDto } from "../dto/hotel.dto";

export type CreateUserParams = Partial<{
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}>;

export enum Gender {
  male = "Male",
  female = "Female",
  other = "Other",
}

export enum SvcTypes {
  hotel = "Hotels",
  tour = "Tours",
}

export type CreateUserProfile = Partial<{
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  address: string;
  gender: Gender;
}>;

export type CreateHotelParams = CreateHotelDto;
