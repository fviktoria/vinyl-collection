export interface DiscogsResponseInterface {
	pagination: {
		page: number;
		pages: number;
		per_page: number;
		items: number;
		urls: {
			last: string;
		};
	};
}

export interface DiscogsReleasesResponseInterface extends DiscogsResponseInterface {
	releases: DiscogsReleaseInterface[];
}

export interface DiscogsReleaseInterface {
	id: number;
	instance_id: number;
	date_added: string;
	rating: number;
	folder_id: number;

	basic_information: DiscogsBasicInformationInterface;
}

export interface DiscogsBasicInformationInterface {
	id: number;
	master_id: number;
	master_url: string;
	resource_url: string;
	thumb: string;
	cover_image: string;
	title: string;
	year: number;
	formats: DiscogsReleaseFormatInterface[];
	artists: DiscogsArtistInterface[];
	labels: DiscogsLabelInterface[];
	genres: string[];
	styles: string[];
}

interface DiscogsReleaseFormatInterface {
	name: string;
	qty: string;
	text: string;
	descriptions: string[];
}

interface DiscogsArtistInterface {
	id: number;
	name: string;
	resource_url: string;
	anv: unknown;
	join: unknown;
	role: unknown;
	tracks: unknown;
}

interface DiscogsLabelInterface {
	name: string;
	catno: string;
	entity_type: string;
	entity_type_name: string;
	id: number;
	resource_url: string;
}

export interface DiscogsWantsResponseInterface extends DiscogsResponseInterface {
	wants: DiscogsWantsInterface[];
}

export interface DiscogsWantsInterface {
	id: number;
	resource_url: string;
	date_added: string;
	basic_information: DiscogsBasicInformationInterface;
	rating: number;
	notes: string;
}

export type AlbumType = DiscogsWantsInterface | DiscogsReleaseInterface;

export interface DiscogsWantsWithReservedInterface extends DiscogsWantsInterface {
	reserved?: boolean;
}
