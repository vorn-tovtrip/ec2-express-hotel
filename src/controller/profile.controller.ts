import { Request, Response } from "express";
import { ApiResponse } from "../types";
import { handleResponse } from "../utils";
import { plainToInstance } from "class-transformer";
import { ProfileDto } from "../dto/profile.dto";
import ProfileService from "../services/profile.service";
import UserService from "../services/user.service";
class ProfileController {
  private hotelService: ProfileService;
  private userService: UserService;
  constructor() {
    this.hotelService = new ProfileService();
    this.userService = new UserService();
  }
  findByIdOrExist = (id: string) => {
    return this.hotelService.findById(parseInt(id));
  };

  async findProfileId(req: Request, res: Response) {
    // await this.hotelService.findById();
  }
  async updateProfileByd(req: Request, res: Response) {}
  async deleteProfileById(req: Request<{ id: string }, {}, {}>, res: Response) {
    const { id } = req.params;
    const resultDelete = await this.hotelService.findByIdAndDelete(id);
    return handleResponse(res, 201, "success", resultDelete);
  }

  async getUsers(req: Request, res: Response) {
    const profileEntity = await this.hotelService.findAll();
    const profileResponse = plainToInstance(ProfileDto, profileEntity, {
      excludeExtraneousValues: true,
    });
    return handleResponse(res, 201, "success", profileResponse);
  }
  async createProfileUser(
    req: Request<{}, {}, any>,
    res: Response<ApiResponse<{}>>
  ) {
    const payload = req.body;
    await this.userService.findById(payload.userId);
    const data = await this.hotelService.createOne(payload);
    return handleResponse(res, 201, "success", data);
  }
  async updateUserProfile(
    req: Request<{}, {}, any>,
    res: Response<ApiResponse<{}>>
  ) {}
}

export default new ProfileController();
