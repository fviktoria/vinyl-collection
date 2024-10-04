import {
	Badge,
	Box,
	Card,
	CardBody,
	CardFooter,
	Heading,
	Image,
	Stack,
	Text,
} from '@chakra-ui/react';

import { AlbumCardActions } from '../album-card-actions/album-card-actions';

import type { ComponentProps, FC } from 'react';
import type { AlbumCard } from '../album-card';

type AlbumGridCardProps = Pick<
	ComponentProps<typeof AlbumCard>,
	'album' | 'showFooter'
> & {
	isReserved?: boolean;
	artistNames: string;
	link?: string;
};

export const AlbumGridCard: FC<AlbumGridCardProps> = ({
	album,
	isReserved,
	artistNames,
	showFooter,
	link,
}) => {
	return (
		<Card opacity={isReserved ? 0.4 : 1} overflow="hidden">
			<Image
				src={album.basic_information.cover_image}
				aspectRatio={1}
				objectFit="cover"
				width="100%"
				alt={`${album.basic_information.title} Cover`}
			/>
			<CardBody>
				<Stack spacing={3}>
					<Box>
						<Heading as="h3" size="sm">
							{album.basic_information.title}
						</Heading>
						<Text fontSize="md">{artistNames}</Text>
					</Box>
					{album.basic_information.genres.length > 0 && (
						<Box display="flex" gap={1}>
							{album.basic_information.genres.map((genre) => (
								<Badge key={`${album.id}-${genre}`}>{genre}</Badge>
							))}
						</Box>
					)}
				</Stack>
			</CardBody>
			{showFooter && (
				<CardFooter>
					<AlbumCardActions album={album} link={link} isReserved={isReserved} />
				</CardFooter>
			)}
		</Card>
	);
};
