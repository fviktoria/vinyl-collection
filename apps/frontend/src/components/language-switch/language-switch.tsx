import { useCallback } from 'react';
import { FormLabel, Select } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import type { ChangeEventHandler, FC } from 'react';

export const LanguageSwitch: FC = () => {
	const { t } = useTranslation();
	const router = useRouter();

	const handleChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
		(event) => {
			router.push(router.asPath, router.asPath, { locale: event.target.value });
		},
		[router],
	);

	return (
		<FormLabel>
			{t('labels.selectLanguage')}
			<Select
				onChange={handleChange}
				placeholder={t('labels.selectLanguage')}
				value={router.locale}
			>
				<option value="de">Deutsch</option>
				<option value="en">English</option>
			</Select>
		</FormLabel>
	);
};
