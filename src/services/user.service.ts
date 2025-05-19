import { Repository } from "typeorm";
import { Profiles } from "../entity/profile.entities";
import { User } from "../entity/user.entities";
import { CreateUserParams, CreateUserProfile } from "../types";
import CustomError from "../utils/error";
import BaseRepository from "./base.repository";

class UserService {
  private profileRepository: Repository<Profiles>;
  private userRepository: Repository<User>;
  constructor() {
    this.profileRepository = new BaseRepository().getProfileRepository();
    this.userRepository = new BaseRepository().getUserRepository();
  }

  async createNewProfileUser(payload: CreateUserProfile) {
    const profile = this.profileRepository?.create({
      address: payload.address,
      gender: payload.gender,
    });

    const user = this.userRepository.create({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      password: payload.password,
      profile: profile,
    });

    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      order: {
        id: "DESC",
      },
      relations: ["profile"],
      select: {
        email: true,
        firstName: true,
        id: true,
        lastName: true,
      },
    });
  }
  async findById(id: number) {
    const data = await this.userRepository.findOne({
      where: {
        id,
      },

      relations: {
        profile: true,
      },
    });
    if (!data) {
      throw new CustomError(404, "User is not found");
    }
    return data;
  }
  async findByIdAndDelete(id: number) {
    const userRemoved = await this.findById(id);

    if (userRemoved) {
      await this.profileRepository.remove(userRemoved.profile);

      return this.userRepository.remove(userRemoved);
    }
    throw new CustomError(404, "User not found");
  }
  async findAndUpdate(id: number, params: any) {
    const exist = await this.findById(id);
    if (exist) {
      return await this.userRepository.update(id, params);
    }
    throw new CustomError(404, "User not found");
  }

  async createOne(params: CreateUserParams) {
    const user = this.userRepository.create(params);
    return await this.userRepository.save(user);
  }
}

export default UserService;
