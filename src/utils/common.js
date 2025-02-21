import { loadavg, totalmem, freemem } from 'os';
import crypto from 'crypto';
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

/**
 * Generates a cryptographically secure random integer within a given range.
 * @returns {number} - A random integer between min and max.
 */
const cryptoRandomInt = () => {
  const randomBytes = crypto.randomBytes(6); // Get 6 random bytes
  const randomValue = randomBytes.readUInt32BE(0); // Convert to 32-bit unsigned integer

  return randomValue; // Map to range
};

export {
  getApplicationHealth,
  getSystemHealth,
  generateAccessToken,
  cryptoRandomInt,
};
