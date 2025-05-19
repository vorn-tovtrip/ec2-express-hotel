import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { Hotel } from "./hotel.entities";

@Entity("amentities")
export class Amentities extends BaseEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "text",
  })
  iconSvg: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Timestamp;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Timestamp;

  @ManyToOne(() => Hotel, (hotel) => hotel.amentities, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  hotel: Hotel;
}
