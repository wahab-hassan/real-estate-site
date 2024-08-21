"use client";

import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { usePathname } from "@/navigation";
import { Locale } from "@/types";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    console.log({ pathname, params }, { locale: nextLocale });

    // startTransition(() => {
    router.replace(`/${nextLocale}${pathname}`);
    // });
  }

  return (
    <div className="flex flex-col">
    <label htmlFor="" className="text-sm pb-2">{label}</label>
    <select
      className="inline-flexs pr-6"
      defaultValue={defaultValue}
      disabled={isPending}
      onChange={onSelectChange}
      >
      {children}
    </select>
      </div>
  );
}
