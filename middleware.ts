import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  // Define the locales and default locale
  const locales = ["en", "ko"];
  const defaultLocale = "en";

  // Check if the URL starts with one of the locales
  const pathname = request.nextUrl.pathname;
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));

  // If the URL doesn't start with a locale, add the default locale
  if (!hasLocale) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  // Handle /admin routes
  if (pathname === (`/${defaultLocale}/admin`) || pathname === (`/ko/admin`)) {
    return NextResponse.redirect(new URL(`/${defaultLocale}/admin/auth/login`, request.url));
  }

  // Continue with the default locale handling provided by next-intl
  return createMiddleware({
    locales,
    defaultLocale,
  })(request);
}

// Apply the middleware to specific routes
export const config = {
  // Match all paths to enforce locale and admin checks
  matcher: ["/((?!_next|favicon.ico|public).*)"],
};
