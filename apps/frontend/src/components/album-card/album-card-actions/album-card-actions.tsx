import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { isAlbumTypeWithReserved } from '@record-collection/types/guards/wishlist.guards';
import { usePageContext } from '@record-collection/context/page-context';

import type { ComponentProps, FC, PropsWithChildren } from 'react';
import type { AlbumGridCard } from '../album-grid-card/album-grid-card';

type AlbumCardActionsProps = Pick<
	ComponentProps<typeof AlbumGridCard>,
	'album' | 'link' | 'isReserved'
>;

export const AlbumCardActions: FC<PropsWithChildren<AlbumCardActionsProps>> = ({
	album,
	link,
	isReserved,
}) => {
	const { t } = useTranslation();
	const { setWishlist } = usePageContext();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef(null);

	const [email, setEmail] = useState('');
	const [error, setError] = useState<string>();
	const [isSubmitting, setIsSubmitting] = useState<boolean>();

	const fetchWishlist = useCallback(async () => {
		try {
			const response = await fetch('/api/wishlist');
			const wishlist = await response.json();
			setWishlist(wishlist);
		} catch (e) {
			return null;
		}
	}, [setWishlist]);

	const setReserved = useCallback(async () => {
		setIsSubmitting(true);
		try {
			await fetch('/api/wishlist/reserve', {
				method: 'POST',
				body: JSON.stringify({ id: album.id, email }),
			});
			await fetchWishlist();
			setIsSubmitting(false);
		} catch (e) {
			setError('There was an error reserving the album');
		}
	}, [album.id, email, fetchWishlist]);

	const undoReserve = useCallback(async () => {
		setIsSubmitting(true);
		try {
			await fetch('/api/wishlist/reserve', {
				method: 'DELETE',
				body: JSON.stringify({ id: album.id, email }),
			});
			await fetchWishlist();
			setIsSubmitting(false);
		} catch (e) {
			setError('There was an error undoing the reservation');
		}
	}, [album.id, email, fetchWishlist]);

	const handleReserve = useCallback(() => {
		if (!email || email.length === 0) {
			setError(t('albumCard.reserve.errors.email'));
			return;
		} else {
			setError(undefined);
		}

		setReserved();
	}, [email, setReserved, t]);

	const handleUndoReserve = useCallback(() => {
		if (!email || email.length === 0) {
			setError(t('albumCard.reserve.errors.email'));
			return;
		} else {
			setError(undefined);
		}

		undoReserve();
	}, [email, undoReserve, t]);

	useEffect(() => {
		if (!isSubmitting) {
			onClose();
		}
	}, [onClose, isSubmitting]);

	const title = isReserved
		? t('albumCard.undoReserve.title')
		: t('albumCard.reserve.title');

	const helperText = isReserved
		? t('albumCard.undoReserve.helperText')
		: t('albumCard.reserve.helperText');

	return (
		<>
			<Flex
				gap={1}
				flexDirection={{
					base: 'column',
					md: 'row',
				}}
				width="100%"
			>
				{link && (
					<Button
						{...(link && !isReserved && { as: Link, href: link, target: '_blank' })}
						disabled={isReserved}
						colorScheme="gray"
					>
						{t('albumCard.viewOnline')}
					</Button>
				)}
				{isAlbumTypeWithReserved(album) && (
					<Button onClick={onOpen} colorScheme="gray">
						{isReserved ? t('labels.undoReserve') : t('labels.reserve')}
					</Button>
				)}
			</Flex>

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							{title}
						</AlertDialogHeader>

						<AlertDialogBody>
							{helperText}
							<FormControl isInvalid={!!error} mt={3}>
								<Input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder={t('labels.email')}
									aria-label={t('labels.email')}
								/>
								<FormErrorMessage>{error}</FormErrorMessage>
							</FormControl>
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} colorScheme="gray" onClick={onClose}>
								{t('labels.cancel')}
							</Button>
							<Button
								onClick={isReserved ? handleUndoReserve : handleReserve}
								ml={3}
								isLoading={isSubmitting}
							>
								{isReserved ? t('labels.undoReserve') : t('labels.reserve')}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};
