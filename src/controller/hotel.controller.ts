import { CreateHotelDto } from "../dto/hotel.dto";
import HotelService from "../services/hotel.service";
import { handleResponse } from "../utils";
import { Request, Response } from "express";
class HotelController {
  private hotelService: HotelService;
  constructor() {
    this.hotelService = new HotelService();
  }
  async findHotels(req: Request, res: Response) {
    const data = await this.hotelService.getAllHotel();
    return handleResponse(
      res,
      200,
      "success server" + process.env?.SERVER,
      data
    );
  }
  async createHotel(req: Request<{}, {}, CreateHotelDto>, res: Response) {
    const payload = req.body;
    const data = await this.hotelService.createHotel(payload);
    return handleResponse(res, 200, "hotel has been found", data);
  }
  async deleteHotel(req: Request<{ id: string }, {}, {}>, res: Response) {
    const { id } = req.params;
    const data = await this.hotelService.deleteSingleHotel(id);
    return handleResponse(res, 200, "success", data);
  }
}

export default new HotelController();
