import { createSharedPathnamesNavigation } from "next-intl/navigation";

const locales: any = ["en", "ko"];

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
