import { Redis } from 'ioredis';
import logger from '../utils/logger.js';

let client;

export const createRedisClient = async () => {
  client = new Redis();

  logger.info('REDIS_CONNECTED', { meta: { message: 'Connected to Redis' } });
};

export const disconnectRedisClient = async () => {
  await client.disconnect();
};

export const setKey = async (key, value) => {
  await client.set(key, value, 'EX', 300);
};

export const getKey = async (key) => {
  return await client.get(key);
};

export const deleteKey = async (key) => {
  await client.del(key);
};
