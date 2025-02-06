import { loadavg, totalmem, freemem } from 'os';
import config from '../config/index.js';
import jwt from 'jsonwebtoken';

const getApplicationHealth = () => {
  return {
    env: config.env,
    uptime: `${process.uptime().toFixed(2)} Second`,
    memoryUsage: {
      heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
    },
  };
};

const getSystemHealth = () => {
  return {
    cpu_usage: loadavg(),
    totalMemory: `${(totalmem() / 1024 / 1024).toFixed(2)} MB`,
    freeMemory: `${(freemem() / 1024 / 1024).toFixed(2)} MB`,
  };
};

const generateAccessToken = (data) => {
  const secretKey = config.secret;
  const token = jwt.sign(data, secretKey, { expiresIn: '1h' });
  return token;
};

export { getApplicationHealth, getSystemHealth, generateAccessToken };
