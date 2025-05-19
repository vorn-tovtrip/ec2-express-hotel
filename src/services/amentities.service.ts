import { Repository } from "typeorm";
import { CreateAmentitiesDTO } from "../dto/amentities.dto";
import { Amentities } from "../entity/amentities.entities";
import { Hotel } from "../entity/hotel.entities";
import BaseRepository from "./base.repository";
import CustomError from "../utils/error";

class HotelService {
  private repository: Repository<Amentities>;
  private hotelRepo: Repository<Hotel>;

  constructor() {
    this.repository = new BaseRepository().getAmentitiesRepository();
    this.hotelRepo = new BaseRepository().getHotelRepository();
  }

  getAmentities() {
    return this.repository.find({
      order: {
        createdAt: "desc",
      },
      relations: {
        hotel: true,
      },
    });
  }

  async createAmentities(payload: CreateAmentitiesDTO) {
    const amentities = this.repository.create(payload);
    return this.repository.save(amentities);
  }
  async deleteAmentities(id: string) {
    const isExisted = await this.repository.findOne({
      where: {
        id: parseInt(id),
      },
    });
    if (!isExisted) {
      throw new CustomError(400, "Amentites is not found");
    }
    return this.repository.remove(isExisted);
  }
}

export default HotelService;
