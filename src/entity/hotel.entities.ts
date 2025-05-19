import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { SvcTypes } from "../types";
import { Amentities } from "./amentities.entities";
import { Room } from "./room.entities";

@Entity("hotels")
export class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "int",
    default: 0,
    nullable: true,
  })
  star: number;

  @Column({ type: "decimal" })
  price: number;

  @Column({
    type: "boolean",
  })
  hasBreakfast: boolean;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Timestamp;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Timestamp;

  @Column({
    enum: SvcTypes,
    type: "enum",
  })
  svcType: SvcTypes;
  @Column({
    type: "varchar",
    nullable: true,
  })
  location: string;

  @OneToMany(() => Amentities, (amentities) => amentities.hotel, {
    cascade: true,
  })
  amentities: Amentities[];

  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[];
}
