import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./LocalSwitcherSelect";
import { locales } from "@/i18n";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  console.log(locales);

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={"Select Language"}>
      {locales.map((cur: any) => (
        <option key={cur} value={cur}>
          {cur}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
