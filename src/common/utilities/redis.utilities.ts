import * as redis from 'redis';
import {
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
} from '../../config/env.config';

const client = redis.createClient(Number(REDIS_PORT), REDIS_HOST, {
  ...(REDIS_PASSWORD && { password: REDIS_PASSWORD }),
});

interface RedisResponse {
  status: boolean;
  data: any;
  error?: any;
}

export class RedisCache {
  private static response: RedisResponse = {
    status: false,
    data: {},
  };

  static async setter(
    key: string,
    value: string,
    time?: number,
  ): Promise<RedisResponse> {
    client.set(key, value, redis.print);
    client.expire(key, time || 60 * 2);
    this.response.status = true;
    return this.response;
  }

  static getter(key: string): Promise<RedisResponse> {
    return new Promise((resolve, reject) => {
      client.get(key, (err: any | null, res: string | null) => {
        if (err) {
          this.response.error = err;
          return reject(this.response);
        }
        this.response.status = res !== null;

        this.response.data = res;
        return resolve(this.response);
      });
    });
  }

  static deleteKey(key: string): Promise<RedisResponse> {
    return new Promise((resolve, reject) => {
      client.del(key, (err: any | null, res: number) => {
        if (err) {
          this.response.error = err;
          return reject(this.response);
        }
        this.response.status = res !== null;

        this.response.data = res;
        return resolve(this.response);
      });
    });
  }
}
