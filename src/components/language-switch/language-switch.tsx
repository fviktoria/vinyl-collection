import { FormLabel, Select } from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";

import type { FC } from "react";

// TODO: Fix language switch
export const LanguageSwitch: FC = () => {
  const t = useTranslations();
  const locale = useLocale();

  // const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
  //   (event) => {
  //     const { value } = event.target;
  //   },
  //   []
  // );

  return (
    <FormLabel>
      {t("labels.selectLanguage")}
      <Select
        // onChange={handleChange}
        placeholder={t("labels.selectLanguage")}
        value={locale}
      >
        <option value="de">Deutsch</option>
        <option value="en">English</option>
      </Select>
    </FormLabel>
  );
};
