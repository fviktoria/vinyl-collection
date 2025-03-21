import { discogsClient } from './discogs-client';

import type { DiscogsReleasesResponseInterface } from '@record-collection/types/discogs.types';
import type { DiscogsClientPaginationInterface } from '@record-collection/types/discogs-client.types';

const url = `/users/${process.env.DISCOGS_USER_NAME}/collection/folders/0/releases`;

export const getCollection = (params: DiscogsClientPaginationInterface = {}) => {
	return discogsClient.get<DiscogsReleasesResponseInterface>(url, {
		params,
		next: { tags: ['collection'] },
	});
};
