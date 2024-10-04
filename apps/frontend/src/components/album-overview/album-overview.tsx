'use client';

import {
	Heading,
	Grid,
	GridItem,
	Badge,
	ButtonGroup,
	Button,
	Input,
	Flex,
	InputGroup,
	InputLeftAddon,
	Box,
	useBreakpointValue,
} from '@chakra-ui/react';
import { DragHandleIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { useDebounce } from '@record-collection/hooks/use-debounce';

import { AlbumCard } from '../album-card/album-card';
import { Carousel } from '../carousel/carousel';
import { AlbumPreviewCard } from '../album-card/album-preview-card/album-preview-card';

import type { AlbumType } from '@record-collection/types/discogs.types';
import type { ChangeEventHandler } from 'react';

type AlbumOverviewProps<T extends AlbumType[] = AlbumType[]> = {
	albums: T;
	heading: string;
	showCount?: boolean;
	showFooter?: boolean;
	variant?: 'grid' | 'list';
	isTeaser?: boolean;
	overviewLink?: string;
};

export const AlbumOverview = <T extends AlbumType[]>({
	heading,
	albums,
	showCount = false,
	showFooter,
	variant: defaultVariant = 'grid',
	isTeaser = false,
	overviewLink,
}: AlbumOverviewProps<T>) => {
	const { t } = useTranslation();

	const [variant, setVariant] = useState<'grid' | 'list'>(defaultVariant);
	const [search, setSearch] = useState<string>('');
	const debouncedValue = useDebounce<string>(search, 500);

	const handleSearch: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
		setSearch(event.target.value);
	}, []);

	const filteredAlbums = useMemo(
		() =>
			debouncedValue.length > 0
				? albums.filter((album) => {
						const title = album.basic_information.title.toLowerCase();
						const artist = album.basic_information.artists
							.map((artist) => artist.name.toLowerCase())
							.join(' ');
						const searchTerm = debouncedValue.toLowerCase();
						return title.includes(searchTerm) || artist.includes(searchTerm);
					})
				: albums,
		[albums, debouncedValue],
	);

	const isMobile = useBreakpointValue({
		base: true,
		md: false,
	});

	return (
		<>
			<Flex
				flexDirection={{
					base: 'column',
					md: 'row',
				}}
				alignItems={{
					base: 'flex-start',
					md: 'center',
				}}
				mb={6}
				gap={{
					base: 0,
					md: 3,
				}}
			>
				<Heading as="h2" size={{ base: 'lg', md: 'xl' }}>
					{heading}
				</Heading>
				{showCount && (
					<Box>
						<Badge>{t('overview.records', { count: albums.length })}</Badge>
					</Box>
				)}
			</Flex>
			{!isTeaser && (
				<Flex gap={3} mb={6}>
					<ButtonGroup isAttached>
						<Button
							size="md"
							variant="outline"
							onClick={() => setVariant('grid')}
							isActive={variant === 'grid'}
						>
							<DragHandleIcon />
						</Button>
						<Button
							size="md"
							variant="outline"
							onClick={() => setVariant('list')}
							isActive={variant === 'list'}
						>
							<HamburgerIcon />
						</Button>
					</ButtonGroup>
					<InputGroup>
						{!isMobile && (
							<InputLeftAddon>
								<SearchIcon />
							</InputLeftAddon>
						)}
						<Input
							size="md"
							variant="outline"
							placeholder={`${t('labels.search')}...`}
							onChange={handleSearch}
							aria-label={t('labels.search')}
						/>
					</InputGroup>
				</Flex>
			)}
			{!isTeaser ? (
				<Grid
					templateColumns={
						variant === 'grid'
							? {
									base: 'repeat(1, minmax(0,1fr))',
									md: 'repeat(2, minmax(0,1fr))',
									lg: 'repeat(4, minmax(0,1fr))',
								}
							: 'minmax(0, 1fr)'
					}
					gap={6}
					mb={6}
				>
					{filteredAlbums.map((album) => (
						<GridItem key={album.id}>
							<AlbumCard album={album} showFooter={showFooter} variant={variant} />
						</GridItem>
					))}
				</Grid>
			) : (
				<Box marginBottom={6}>
					<Carousel>
						{filteredAlbums.map((album) => (
							<AlbumCard
								key={album.id}
								album={album}
								showFooter={showFooter}
								variant={variant}
							/>
						))}
						{overviewLink && (
							<AlbumPreviewCard
								album={albums[0]}
								showFooter={showFooter}
								variant={variant}
								href={overviewLink}
							/>
						)}
					</Carousel>
				</Box>
			)}
		</>
	);
};
