import type { AlbumType } from './discogs.types';

export interface UpstashWishlistItemInterface {
	reserved?: boolean;
	email?: string;
}

export type AlbumTypeWithReserved = AlbumType & { reserved?: boolean };
