import { AppDataSource } from "../database/data-source";
import { User } from "../database/entity/User";

export class UsersRepository {
  static repository = AppDataSource.getRepository(User);

  static async create(user: User): Promise<void> {
    await this.repository.insert(user);
  }

  static async exist(login: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { login } });
    return user;
  }

  static async findById(userId: string): Promise<void> {
    await this.repository.findOne({ where: { userId } });
  }

  static async delete(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }
}
