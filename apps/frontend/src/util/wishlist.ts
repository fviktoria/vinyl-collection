import { isUpstashWishlistItem } from '../types/guards/wishlist.guards';
import { getRedisClient } from './redis-client';

import type { UpstashWishlistItemInterface } from '../types/wishlist.types';

export type SetReservedParams = {
	id: string;
	email?: string;
};

export const getWishlistReserved = async (ids: string[]) => {
	const redisClient = getRedisClient();
	if (!redisClient) return;

	// will return: [ { reserved: true }, null ]
	const values: (UpstashWishlistItemInterface | null)[] = await redisClient.mget(ids);

	// match values with ids (=keys)
	const matchedValues: Record<string, UpstashWishlistItemInterface> = values.reduce(
		(acc, value, index) => {
			if (value !== null && isUpstashWishlistItem(value)) {
				acc[ids[index]] = value;
			}
			return acc;
		},
		{} as Record<string, UpstashWishlistItemInterface>,
	);

	return matchedValues;
};

export const setItemAsReserved = async ({ id, email }: SetReservedParams) => {
	const redisClient = getRedisClient();
	await redisClient?.set(id, { reserved: true, email });
};

export const undoSetItemAsReserved = async ({ id, email }: SetReservedParams) => {
	const redisClient = getRedisClient();
	const item = await redisClient?.get<UpstashWishlistItemInterface>(id);

	if (!item) {
		return { status: 'error', message: 'wishlist.error.item-not-found' };
	}

	// check email
	if (!email || item.email !== email) {
		return { status: 'error', message: 'wishlist.error.email-not-matching' };
	}

	try {
		await redisClient?.del(id);
		return { status: 'success' };
	} catch {
		return { status: 'error', message: 'wishlist.error.redis-error' };
	}
};
