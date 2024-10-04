import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useEffect, type ComponentProps, type FC, useState } from 'react';

import { StyledBackButtonWrapper } from './back-button.styles';

export const BackButton: FC<ComponentProps<typeof Button>> = ({ children, ...props }) => {
	const { t } = useTranslation();

	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<StyledBackButtonWrapper isScrolled={isScrolled}>
			<Button as={Link} href="/" leftIcon={<ArrowBackIcon />} {...props}>
				{children ?? t('labels.backToOverview')}
			</Button>
		</StyledBackButtonWrapper>
	);
};
