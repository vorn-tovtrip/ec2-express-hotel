import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "../utils/base/profile.entities";
import { Profiles } from "./profile.entities";

@Entity("users")
export class User extends Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 255, nullable: false })
  email: string;
  @Column({ type: "varchar", length: 255 })
  password: string;

  @OneToOne(() => Profiles, (profile) => profile?.user, {
    cascade: ["insert", "remove", "update"],
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  profile: Profiles;
}
