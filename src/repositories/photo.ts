import { AppDataSource } from "../database/data-source";
import { Photo } from "../database/entity/Photo";

export class PhotoRepository {
  static repository = AppDataSource.getRepository(Photo);

  static async create(photo: Photo): Promise<void> {
    await this.repository.insert(photo);
  }

  static async getPhotos(): Promise<Photo[]> {
    const photos = await this.repository.find({
      select: {
        photoUrl: true,
        description: true,
        portfolioName: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
    return photos;
  }

  static async findByIdAndUrl(
    photoUrl: string,
    userId: string
  ): Promise<Photo[] | null> {
    const photo = await this.repository
      .createQueryBuilder("photo")
      .where("photo.photoUrl = :photoUrl", { photoUrl })
      .andWhere("photo.userId = :userId", { userId })
      .getMany();
    return photo;
  }

  static async delete(photoUrl: string): Promise<void> {
    await this.repository.delete({ photoUrl });
  }

  static async deleteAll(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }

  static async deleteByUserIdAndPortfolioName(
    userId: string,
    portfolioName: string
  ): Promise<void> {
    await this.repository
      .createQueryBuilder("photo")
      .delete()
      .where("portfolioName = :portfolioName", { portfolioName })
      .andWhere("userId = :userId", { userId })
      .execute();
  }
}
