import { Avatar, Box, Container, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';

import { Settings } from '../settings/settings';
import { BackButton } from '../back-button/back-button';

import type { FC, PropsWithChildren } from 'react';

type LayoutProps = {
	showBackButton?: boolean;
};

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
	showBackButton,
	children,
}) => {
	const { t } = useTranslation();
	return (
		<>
			<Head>
				<title>{t('page.title', { name: process.env.NEXT_PUBLIC_OWNER_NAME })}</title>
			</Head>

			<Box overflowX="hidden">
				<Container
					maxWidth="90vw"
					marginTop={{ base: 16, md: 24 }}
					marginBottom={{ base: 12, md: 16 }}
					position="relative"
				>
					{showBackButton && <BackButton />}
					<Flex
						alignItems="center"
						gap={{ base: 3, md: 6 }}
						marginBottom={{ base: 8, md: 16 }}
						as={Link}
						href="/"
					>
						<Avatar
							name={process.env.NEXT_PUBLIC_OWNER_NAME}
							src={process.env.NEXT_PUBLIC_OWNER_AVATAR}
						/>
						<Text as="h1" fontSize={{ base: '3xl', md: '6xl' }} fontWeight="bold">
							{t('page.title', { name: process.env.NEXT_PUBLIC_OWNER_NAME })}
						</Text>
					</Flex>
					{children}
				</Container>
			</Box>

			<Settings />
		</>
	);
};
