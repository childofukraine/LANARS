export class SessionDTO {
  constructor(
    public sessionId: string,
    public userId: string,
    public refreshToken: string,
    public expiresIn: Date
  ) {}
}
