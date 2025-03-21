import {
	Button,
	Divider,
	FormLabel,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Switch,
	useDisclosure,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { SettingsIcon } from '@chakra-ui/icons';

import { usePageContext } from '@record-collection/context/page-context';

import { StyledSettingsWrapper } from './settings.styles';
import { LanguageSwitch } from '../language-switch/language-switch';

import type { FC } from 'react';

export const Settings: FC = () => {
	const { t } = useTranslation();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { labelReserved, setLabelReserved } = usePageContext();

	const handleSwitch = useCallback(
		() => setLabelReserved(!labelReserved),
		[labelReserved, setLabelReserved],
	);

	return (
		<>
			<StyledSettingsWrapper>
				<IconButton aria-label={t('labels.settings')} onClick={onOpen}>
					<SettingsIcon />
				</IconButton>
			</StyledSettingsWrapper>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay backdropFilter="blur(10px)" />
				<ModalContent ml={6} mr={6}>
					<ModalHeader>{t('labels.settings')}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormLabel
							htmlFor="label-reserved"
							display="flex"
							gap={3}
							alignItems="center"
							m={0}
						>
							<Switch
								id="label-reserved"
								onChange={handleSwitch}
								isChecked={labelReserved}
								data-checked={labelReserved}
							/>
							{t('settings.labelReserved')}
						</FormLabel>
						<Divider mt={6} mb={6} />
						<LanguageSwitch />
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={onClose}>
							{t('labels.close')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
