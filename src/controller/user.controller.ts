import bcrypt from "bcryptjs";
import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { CreateProfileUserDTO, CreateUserDTO, UserDto } from "../dto";
import UserService from "../services/user.service";
import { ApiResponse } from "../types";
import { handleResponse } from "../utils";
class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async findUserId(req: Request, res: Response) {
    const { id } = req.params;

    const userEntities = await this.userService.findById(parseInt(id));
    if (userEntities) {
      const userResponse = plainToInstance(UserDto, userEntities, {
        excludeExtraneousValues: true,
      });
      return handleResponse(res, 200, "sucess", userResponse);
    }
  }
  async updateUserId(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.userService.findAndUpdate(parseInt(id), req.body);
    return handleResponse(res, 200, "sucess", req.body);
  }
  async deleteUserId(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.userService.findByIdAndDelete(parseInt(id));

    return handleResponse(res, 200, "sucess", data);
  }
  async createNewUserProfile(
    req: Request<{}, {}, CreateProfileUserDTO>,
    res: Response
  ) {
    const payload = req.body;
    const data = await this.userService.createNewProfileUser(payload);
    return handleResponse(res, 200, "sucess", data);
  }
  async getUsers(req: Request, res: Response) {
    const data = await this.userService.findAll();
    return handleResponse(res, 200, "sucess", data);
  }
  async createUser(
    req: Request<{}, {}, CreateUserDTO>,
    res: Response<ApiResponse<{}>>
  ) {
    const params = req.body;
    console.log(params);

    const hashedPassword = bcrypt.hashSync(params.password, 5);
    const args = {
      ...params,
      password: hashedPassword,
    };
    const data = await this.userService.createOne(args);
    return handleResponse(res, 201, "sucess", data);
  }
}

export default new UserController();
