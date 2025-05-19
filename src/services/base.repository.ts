import { Repository } from "typeorm";
import { PostgresDataSource } from "../config";
import { Hotel } from "../entity/hotel.entities";
import { Profiles } from "../entity/profile.entities";
import { User } from "../entity/user.entities";
import { Amentities } from "../entity/amentities.entities";
class BaseRepository {
  private userRepository: Repository<User>;
  private profileRepository: Repository<Profiles>;
  private hotelRepository: Repository<Hotel>;
  private amentitiesRepository: Repository<Amentities>;

  constructor() {
    this.userRepository = PostgresDataSource.getRepository(User);
    this.profileRepository = PostgresDataSource.getRepository(Profiles);
    this.hotelRepository = PostgresDataSource.getRepository(Hotel);
    this.amentitiesRepository = PostgresDataSource.getRepository(Amentities);
  }

  getUserRepository() {
    return PostgresDataSource.getRepository(User);
  }
  getProfileRepository() {
    return PostgresDataSource.getRepository(Profiles);
  }
  getHotelRepository() {
    return PostgresDataSource.getRepository(Hotel);
  }
  getAmentitiesRepository() {
    return PostgresDataSource.getRepository(Amentities);
  }
}

export default BaseRepository;
