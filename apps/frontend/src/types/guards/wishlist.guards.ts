import type {
	AlbumTypeWithReserved,
	UpstashWishlistItemInterface,
} from '../wishlist.types';

export const isUpstashWishlistItem = (
	value: unknown,
): value is UpstashWishlistItemInterface => {
	if (!value) return false;
	if (typeof value !== 'object') return false;
	return true;
};

export const isAlbumTypeWithReserved = (arg: unknown): arg is AlbumTypeWithReserved => {
	return (arg as AlbumTypeWithReserved).reserved !== undefined;
};
