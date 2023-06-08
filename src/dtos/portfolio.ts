export class PortfolioDTO {
  constructor(
    public portfolioId: string,
    public name: string,
    public description: string,
    public userId: string
  ) {}
}
