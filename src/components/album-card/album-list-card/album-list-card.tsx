import {
	Badge,
	Box,
	Card,
	CardBody,
	Flex,
	Grid,
	Heading,
	Image,
	Stack,
	Text,
} from '@chakra-ui/react';

import { AlbumCardActions } from '../album-card-actions/album-card-actions';

import type { AlbumGridCard } from '../album-grid-card/album-grid-card';
import type { ComponentProps, FC } from 'react';

export const AlbumListCard: FC<ComponentProps<typeof AlbumGridCard>> = ({
	album,
	isReserved,
	artistNames,
	showFooter,
	link,
}) => {
	return (
		<Card opacity={isReserved ? 0.4 : 1}>
			<CardBody>
				<Flex
					gap={{ base: 0, md: 3 }}
					flexDirection={{ base: 'column', md: 'row' }}
					justifyContent={{ md: 'space-between' }}
					alignItems={{ md: 'center' }}
				>
					<Grid gap={3} gridTemplateColumns="5rem auto">
						<Box>
							<Image
								src={album.basic_information.cover_image}
								aspectRatio={1}
								objectFit="cover"
								width="100%"
								alt={`${album.basic_information.title} Cover`}
							/>
						</Box>
						<Stack>
							<Box>
								<Heading as="h3" size="sm">
									{album.basic_information.title}
								</Heading>
								<Text fontSize="md">{artistNames}</Text>
							</Box>

							{album.basic_information.genres.length > 0 && (
								<Flex gap={1} wrap="wrap">
									{album.basic_information.genres.map((genre) => (
										<Badge key={`${album.id}-${genre}`}>{genre}</Badge>
									))}
								</Flex>
							)}
						</Stack>
					</Grid>
					<Box
						width={{
							base: '100%',
							md: 'auto',
						}}
					>
						{showFooter && (
							<AlbumCardActions album={album} link={link} isReserved={isReserved} />
						)}
					</Box>
				</Flex>
			</CardBody>
		</Card>
	);
};
