export class PhotoDTO {
  constructor(
    public photoId: string,
    public photoUrl: string,
    public name: string,
    public description: string,
    public comment: string,
    public portfolioName: string,
    public userId: string,
    public createdAt: Date
  ) {}
}
