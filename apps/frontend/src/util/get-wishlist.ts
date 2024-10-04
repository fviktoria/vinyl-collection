import { discogsClient } from './discogs-client';

import type { DiscogsWantsResponseInterface } from '@record-collection/types/discogs.types';
import type { DiscogsClientPaginationInterface } from '@record-collection/types/discogs-client.types';

const url = `/users/${process.env.DISCOGS_USER_NAME}/wants`;

export const getWishlist = (params: DiscogsClientPaginationInterface = {}) => {
	return discogsClient.get<DiscogsWantsResponseInterface>(url, {
		params,
		next: { tags: ['wishlist'] },
	});
};
