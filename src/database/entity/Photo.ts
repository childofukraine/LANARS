import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Photo {
  @PrimaryColumn()
  photoId!: string;

  @Column()
  photoUrl!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  comment!: string;

  @Column()
  portfolioName!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user: User) => user.userId)
  @JoinColumn({ name: "userId" })
  userId!: string;
}
