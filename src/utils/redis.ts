import { Redis } from "ioredis";
import config from "../config";

const redisClient = () => {
  if (config.redis_url) {
    console.log("Redis connected");
    return new Redis(config.redis_url, {
      tls: {}, // Ensures that the connection uses TLS
      maxRetriesPerRequest: 30, // Increase the number of retries
      connectTimeout: 10000, // Set a connection timeout (10 seconds)
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000); // Exponential backoff
        return delay;
      },
    });
  }
  throw new Error("Redis Connection failed");
};

export const redis = redisClient();
