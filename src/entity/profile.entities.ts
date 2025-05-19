import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Gender } from "../types";
import { User } from "./user.entities";

@Entity("profiles")
export class Profiles extends BaseEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({
    type: "varchar",
  })
  address: string;

  @Column({
    enum: Gender,
    type: "enum",
  })
  gender: Gender;
  @OneToOne(() => User, (user) => user?.profile, {})
  user: User;
}
