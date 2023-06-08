import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";

import { User } from "./User";

@Entity()
export class Portfolio {
  @PrimaryColumn()
  portfolioId!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToOne(() => User, (user: User) => user.userId)
  @JoinColumn({ name: "userId" })
  userId!: string;
}
