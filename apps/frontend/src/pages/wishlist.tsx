import { Box } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import { AlbumOverview } from '@record-collection/components/album-overview/album-overview';
import { Layout } from '@record-collection/components/layout/layout';
import { getWishlistWithReserved } from '@record-collection/util/get-wishlist-with-reserved';
import { usePageContext } from '@record-collection/context/page-context';

import type {
	AlbumType,
	DiscogsWantsResponseInterface,
} from '@record-collection/types/discogs.types';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';

export default function Wishlist({
	wishlist: ssrWishlist,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation();
	const { wishlist, setWishlist } = usePageContext();

	useEffect(() => {
		if (ssrWishlist) {
			setWishlist(ssrWishlist);
		}
	}, [ssrWishlist, setWishlist]);

	if (!wishlist) return null;

	return (
		<Layout showBackButton>
			<Box as="section" mt={12}>
				<AlbumOverview
					heading={t('wishlist.title')}
					albums={wishlist?.wants as AlbumType[]}
					showCount
				/>
			</Box>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<{
	wishlist: DiscogsWantsResponseInterface;
}> = async ({ locale = 'en' }) => {
	const wishlist = await getWishlistWithReserved();

	return {
		props: {
			wishlist,
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
};
