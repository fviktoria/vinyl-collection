import type { DiscogsWantsInterface } from '../discogs.types';

export const isDiscogsWantsInterface: (arg: unknown) => arg is DiscogsWantsInterface = (
	arg: unknown,
): arg is DiscogsWantsInterface => {
	return (arg as DiscogsWantsInterface).notes !== undefined;
};
