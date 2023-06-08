import { AppDataSource } from "../database/data-source";
import { Portfolio } from "../database/entity/Portfolio";

export class PortfolioRepository {
  static repository = AppDataSource.getRepository(Portfolio);

  static async create(portfolio: Portfolio): Promise<void> {
    await this.repository.insert(portfolio);
  }

  static async exist(name: string): Promise<Portfolio | null> {
    const portfolio = await this.repository.findOne({ where: { name } });
    return portfolio;
  }

  static async findByUserIdAndPortfolioId(
    portfolioId: string,
    userId: string
  ): Promise<Portfolio[] | null> {
    const portfolio = await this.repository
      .createQueryBuilder("portfolio")
      .where("portfolio.portfolioId = :portfolioId", { portfolioId })
      .andWhere("portfolio.userId = :userId", { userId })
      .getMany();
    return portfolio;
  }

  static async delete(userId: string, portfolioId: string): Promise<void> {
    await this.repository
      .createQueryBuilder("portfolio")
      .delete()
      .where("portfolioId = :portfolioId", { portfolioId })
      .andWhere("userId = :userId", { userId })
      .execute();
  }

  static async deleteAll(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }
}
