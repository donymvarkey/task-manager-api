import { config } from 'dotenv-flow';

config();

const appConfig = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  env: process.env.ENV,
  server_url: process.env.SERVER_URL,
  analytics_api_key: process.env.ANALYTICS_API_KEY,
};

export default appConfig;
