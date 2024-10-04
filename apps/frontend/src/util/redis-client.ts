import { Redis } from '@upstash/redis';

let redisClient: Redis | null = null;

export const getRedisClient = () => {
	if (!redisClient && process.env.UPSTASH_URL && process.env.UPSTASH_TOKEN) {
		redisClient = new Redis({
			url: process.env.UPSTASH_URL,
			token: process.env.UPSTASH_TOKEN,
		});
	}

	return redisClient;
};
