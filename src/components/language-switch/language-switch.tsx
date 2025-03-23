import { FormLabel, Select } from "@chakra-ui/react";
import { usePathname, useRouter } from "@vinyl-collection/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

import { useEffect, useState, type FC } from "react";

export const LanguageSwitch: FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [value, setValue] = useState(locale);

  useEffect(() => {
    router.replace(pathname, { locale: value });
  }, [locale, pathname, router, value]);

  return (
    <FormLabel>
      {t("labels.selectLanguage")}
      <Select
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("labels.selectLanguage")}
        value={value}
      >
        <option value="de">Deutsch</option>
        <option value="en">English</option>
      </Select>
    </FormLabel>
  );
};
