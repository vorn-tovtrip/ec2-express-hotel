import { Repository } from "typeorm";
import { Amentities } from "../entity/amentities.entities";
import { Hotel } from "../entity/hotel.entities";
import { CreateHotelParams } from "../types";
import BaseRepository from "./base.repository";
import CustomError from "../utils/error";

class HotelService {
  private repository: Repository<Hotel>;
  private amentitiesRepository: Repository<Amentities>;

  constructor() {
    this.repository = new BaseRepository().getHotelRepository();
    this.amentitiesRepository = new BaseRepository().getAmentitiesRepository();
  }

  getAllHotel() {
    return this.repository.find({
      order: {
        createdAt: "desc",
      },
      relations: {
        amentities: true,
      },
    });
  }
  async createHotel(payload: CreateHotelParams) {
    const amentities = payload.amentities.map((amentity) =>
      this.amentitiesRepository.create({
        ...amentity,
      })
    );
    const hotel = this.repository.create(payload);
    hotel.amentities = amentities;
    const data = await this.repository.save(hotel);
    return data;
  }
  async deleteSingleHotel(id: string) {
    const deleteHotel = await this.repository.findOne({
      where: {
        id: parseInt(id),
      },
    });
    if (!deleteHotel) {
      throw new CustomError(400, "Hotel is not exist.");
    }

    return this.repository.remove(deleteHotel);
  }
}

export default HotelService;
