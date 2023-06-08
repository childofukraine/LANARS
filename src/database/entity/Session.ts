import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Session {
  @PrimaryColumn()
  sessionId!: string;

  @ManyToOne(() => User, (user: User) => user.userId)
  @JoinColumn({ name: "userId" })
  userId!: string;

  @Column()
  refreshToken!: string;

  @Column()
  expiresIn!: Date;
}
