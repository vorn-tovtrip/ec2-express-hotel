import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { Hotel } from "./hotel.entities";

@Entity("rooms")
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({
    type: "int",
  })
  room: number;

  @Column({
    type: "int",
  })
  size: number;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Timestamp;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Timestamp;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  hotel: Hotel;
}
