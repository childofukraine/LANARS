namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      TOKEN_SECRET: string;
      DB_HOST: string;
      DB_PORT: number;
      DB_DATABASE_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      AWS_BUCKET_NAME: string;
      AWS_REGION: string;
      AWS_ACCESS_KEY: string;
      AWS_SECRET: string;
    }
  }