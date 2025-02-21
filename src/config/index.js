import { config } from 'dotenv-flow';

config();

const appConfig = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  env: process.env.ENV,
  server_url: process.env.SERVER_URL,
  analytics_api_key: process.env.ANALYTICS_API_KEY,
  redis_url: process.env.REDIS_URL,
};

export default appConfig;
