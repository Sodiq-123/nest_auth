import * as env from 'env-var';
import { config } from 'dotenv';

config();

export const NODE_ENV = env.get('NODE_ENV').asString();
export const PORT = env.get('PORT').asInt();
export const JWT_SECRET = env.get('JWT_SECRET').asString();

export const DB_URL = env.get('DB_URL').asString();
export const DB_HOST = env.get('DB_HOST').asString();
export const DB_PORT = env.get('DB_PORT').asInt();
export const DB_USERNAME = env.get('DB_USERNAME').asString();
export const DB_PASSWORD = env.get('DB_PASSWORD').asString();
export const DB_DATABASE = env.get('DB_DATABASE').asString();
export const DB_TYPEORM_SYNC = env.get('DB_TYPEORM_SYNC').asBool();
export const DB_MIGRATION = env.get('DB_MIGRATION').asBool();

export const REDIS_HOST = env.get('REDIS_HOST').asString();
export const REDIS_PORT = env.get('REDIS_PORT').asInt();
export const REDIS_PASSWORD = env.get('REDIS_PASSWORD').asString();
