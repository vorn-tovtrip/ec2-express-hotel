import { Request, Response } from "express";
import { CreateAmentitiesDTO } from "../dto/amentities.dto";
import AmentitiesService from "../services/amentities.service";
import { handleResponse } from "../utils";
class AmentitiesController {
  private amentitiesServices: AmentitiesService;
  constructor() {
    this.amentitiesServices = new AmentitiesService();
  }
  async findAllAmentities(req: Request, res: Response) {
    const data = await this.amentitiesServices.getAmentities();
    return handleResponse(res, 200, "success", data);
  }
  async createAmentities(
    req: Request<{}, {}, CreateAmentitiesDTO>,
    res: Response
  ) {
    const payload = req.body;
    console.log(payload);
    const data = await this.amentitiesServices.createAmentities(payload);
    return handleResponse(res, 201, "success", data);
  }
  async deleteSingleAmentities(
    req: Request<{ id: string }, {}, {}>,
    res: Response
  ) {
    const payload = req.params;
    console.log(payload.id);
    const data = await this.amentitiesServices.deleteAmentities(payload.id);
    return handleResponse(res, 201, "success", data);
  }
}

export default new AmentitiesController();
