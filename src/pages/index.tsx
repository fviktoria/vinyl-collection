import { Box, Button } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { getCollection } from '@record-collection/util/get-collection';
import { getWishlist } from '@record-collection/util/get-wishlist';
import { AlbumOverview } from '@record-collection/components/album-overview/album-overview';
import { Layout } from '@record-collection/components/layout/layout';

import type {
	AlbumType,
	DiscogsReleasesResponseInterface,
	DiscogsWantsResponseInterface,
} from '@record-collection/types/discogs.types';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';

export default function Home({
	collection,
	wishlist,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation();

	return (
		<Layout>
			<Box as="section">
				<AlbumOverview
					heading={t('collection.title')}
					albums={collection?.releases as AlbumType[]}
					showFooter={false}
					isTeaser
					overviewLink="/collection"
				/>
				<Button as={Link} href="/collection">
					{t('labels.showAll')}
				</Button>
			</Box>

			<Box as="section" mt={12}>
				<AlbumOverview
					heading={t('wishlist.title')}
					albums={wishlist?.wants as AlbumType[]}
					showFooter={false}
					isTeaser
					overviewLink="/wishlist"
				/>
				<Button as={Link} href="/wishlist">
					{t('labels.showAll')}
				</Button>
			</Box>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<{
	collection: DiscogsReleasesResponseInterface;
	wishlist: DiscogsWantsResponseInterface;
}> = async ({ locale = 'en' }) => {
	const collection = await getCollection({ per_page: 6 });
	const wishlist = await getWishlist({ per_page: 6 });

	return {
		props: {
			collection,
			wishlist,
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
};
