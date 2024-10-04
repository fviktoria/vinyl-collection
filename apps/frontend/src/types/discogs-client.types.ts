import type { ParamsType } from '@record-collection/util/discogs-client';

export interface DiscogsClientPaginationInterface extends ParamsType {
	per_page?: number;
	page?: number;
}
