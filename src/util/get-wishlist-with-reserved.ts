import { getWishlist } from './get-wishlist';
import { getWishlistReserved } from './wishlist';

import type { DiscogsWantsWithReservedInterface } from '@record-collection/types/discogs.types';

export const getWishlistWithReserved = async () => {
	const wishlist = await getWishlist();
	const reservedItems = await getWishlistReserved(
		wishlist.wants.map((album) => album.id.toString()),
	);

	const wantsWithReserved: DiscogsWantsWithReservedInterface[] = wishlist.wants.map(
		(album) => {
			const reservedItem = reservedItems?.[album.id.toString()];

			if (reservedItem) {
				return { ...album, reserved: reservedItem.reserved };
			} else {
				return { ...album, reserved: false };
			}
		},
	);

	// sort wantsWithReserved to put reserved items at the end
	wantsWithReserved.sort((a, b) => {
		if (a.reserved && !b.reserved) {
			return 1;
		}

		if (!a.reserved && b.reserved) {
			return -1;
		}

		return 0;
	});

	return { ...wishlist, wants: wantsWithReserved };
};
