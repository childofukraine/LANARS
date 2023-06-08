import { AppDataSource } from "../database/data-source";
import { Session } from "../database/entity/Session";

export class SessionRepository {
  static repository = AppDataSource.getRepository(Session);

  static async create(session: Session): Promise<void> {
    await this.repository.insert(session);
  }

  static async find(userId: string): Promise<Session[] | null> {
    const sessions = await this.repository.findBy({ userId });
    return sessions;
  }

  static async delete(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }
}
