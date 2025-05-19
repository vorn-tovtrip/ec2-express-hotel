import { Repository } from "typeorm";
import { Profiles } from "../entity/profile.entities";
import { User } from "../entity/user.entities";
import CustomError from "../utils/error";
import BaseRepository from "./base.repository";

class ProfileService {
  private profileRepository: Repository<Profiles>;
  private userRepository: Repository<User>;
  constructor() {
    this.profileRepository = new BaseRepository().getProfileRepository();
    this.userRepository = new BaseRepository().getUserRepository();
  }

  findAll() {
    return this.profileRepository.find({
      order: {
        id: "DESC",
      },
      relations: {
        user: true,
      },
    });
  }
  async findById(id: number) {
    const data = await this.profileRepository.findOneBy({
      id,
    });
    if (!data) {
      throw new CustomError(404, "User Profile is not found");
    }
    return data;
  }
  async findByIdAndDelete(id: string) {
    const profileRemoved = await this.findById(parseInt(id));

    if (profileRemoved) {
      return this.profileRepository.remove(profileRemoved);
    }
    throw new CustomError(404, "Profile not found");
  }
  async findAndUpdate(id: number, params: any) {
    const exist = await this.findById(id);
    if (exist) {
      return await this.profileRepository.update(id, params);
    }
    throw new CustomError(404, "User not found");
  }

  async createOne(params: any) {
    const user = await this.userRepository.findOne({
      where: {
        id: params?.userId,
      },
      relations: {
        profile: true,
      },
    });

    if (user.profile) {
      throw new CustomError(
        400,
        "This user already have an address,if you prefer please update instead"
      );
    }
    if (user) {
      const profile = this.profileRepository.create({
        address: params.address,
        gender: params.gender,
      });
      user.profile = profile;
      return await this.userRepository.save(user);
    }
  }
}

export default ProfileService;
