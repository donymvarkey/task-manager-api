import Server from './src/Server.js';
import appConfig from './src/config/index.js';

const options = {
  port: appConfig.port,
  db_url: appConfig.database_url,
  secret: appConfig.secret,
  nodeEnv: appConfig.env,
  server_url: appConfig.server_url,
  api_analytics_key: appConfig.analytics_api_key,
};

const app = new Server(options);

app.startServer();
