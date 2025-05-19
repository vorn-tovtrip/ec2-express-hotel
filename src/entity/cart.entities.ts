import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";

@Entity("carts")
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({
    type: "varchar",
  })
  name: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Timestamp;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Timestamp;
}
