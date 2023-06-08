import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  userId!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;
}
