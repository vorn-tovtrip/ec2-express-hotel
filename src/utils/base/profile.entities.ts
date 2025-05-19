import { Column } from "typeorm";

export class Profile {
  @Column({ type: "varchar", length: 255, nullable: true })
  firstName: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  lastName: string;
}
