"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, Globe, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth";
import i18nConfig from "@/i18nConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserDropdown from "../members/member-dropdown";
import { NotificationsDropdown } from "./notifications-dropdown";
import { ConfigSite } from "@/lib/conf";
import { cn } from "@/lib/utils";

type HeaderProps =
  | {
      page: "auth";
      step: 1 | 2 | 3;
    }
  | { page: "dashboard" }
  | { page?: "home" };

const LANGUAGES: { code: "ar" | "fr" | "en"; label: string }[] = [
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];

export default function Header(props: HeaderProps) {
  const { page = "home" } = props;
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const immersive = page === "home";

  useEffect(() => {
    if (!immersive) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [immersive]);

  const handleLanguageChange = (newLocale: string) => {
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      if (
        newLocale === i18nConfig.defaultLocale &&
        !i18nConfig.prefixDefault
      ) {
        const newPath = currentPathname.replace(`/${currentLocale}`, "");
        router.push(newPath || "/");
      } else {
        router.push(
          currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
        );
      }
    }

    router.refresh();
  };

  if (page === "dashboard") {
    return null;
  }

  const isGlass = !immersive || scrolled;

  const navLinkClass = cn(
    "text-sm font-medium transition-colors",
    "text-white/85 hover:text-white"
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
        isGlass
          ? "border-b border-[#0078FD]/10 bg-[#080D1A]/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <Link href={`/${currentLocale}`} className="flex items-center">
            <Image
              src="/images/menzili_logo.png"
              alt={`${ConfigSite.siteName} Logo`}
              width={120}
              height={30}
              priority
              className="h-7 w-auto brightness-0 invert"
            />
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href={`/${currentLocale}/listings`}
              className={navLinkClass}
            >
              {i18n.t("common:header.browse")}
            </Link>
            <Link
              href={`/${currentLocale}/about`}
              className={navLinkClass}
            >
              {i18n.t("common:header.about", {
                siteName: ConfigSite.siteName,
              })}
            </Link>
            <Link
              href={`/${currentLocale}/contact`}
              className={navLinkClass}
            >
              {i18n.t("common:header.contact")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* List your property */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="hidden md:block"
          >
            <Link
              href={
                user
                  ? "/dashboard/my-listings/new"
                  : "/auth?callback_url=/dashboard/my-listings/new"
              }
              className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10"
            >
              {i18n.t("common:header.list_property")}
            </Link>
          </motion.div>

          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Language"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Globe className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-[10rem] rounded-xl border border-[#0078FD]/15 bg-[#080D1A]/95 p-1 text-white backdrop-blur-xl"
            >
              {LANGUAGES.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-white/90 focus:bg-white/10 focus:text-white"
                >
                  <span>{lang.label}</span>
                  {currentLocale === lang.code && (
                    <Check className="h-4 w-4 text-blue-400" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <NotificationsDropdown />
              <UserDropdown />
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="hidden md:block"
            >
              <Link
                href="/auth?mode=signup"
                className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.35)] transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                {i18n.t("common:header.signup")}
              </Link>
            </motion.div>
          )}

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/10 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l border-[#0078FD]/15 bg-[#080D1A]/98 text-white backdrop-blur-2xl sm:max-w-sm [&>button]:hidden"
            >
              <div className="flex h-full flex-col gap-8 p-6">
                <div className="flex items-center justify-between">
                  <Image
                    src="/images/menzili_logo.png"
                    alt={`${ConfigSite.siteName} Logo`}
                    width={100}
                    height={26}
                    className="h-7 w-auto brightness-0 invert"
                  />
                  <button
                    aria-label="Close menu"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {[
                    {
                      href: `/${currentLocale}/listings`,
                      label: i18n.t("common:header.browse"),
                    },
                    {
                      href: `/${currentLocale}/about`,
                      label: i18n.t("common:header.about", {
                        siteName: ConfigSite.siteName,
                      }),
                    },
                    {
                      href: `/${currentLocale}/contact`,
                      label: i18n.t("common:header.contact"),
                    },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-3 py-3 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-3">
                  <Link
                    href={
                      user
                        ? "/dashboard/my-listings/new"
                        : "/auth?callback_url=/dashboard/my-listings/new"
                    }
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    {i18n.t("common:header.list_property")}
                  </Link>
                  {!user && (
                    <Link
                      href="/auth?mode=signup"
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.35)] transition-colors hover:bg-blue-500"
                    >
                      {i18n.t("common:header.signup")}
                    </Link>
                  )}
                </div>

                <div className="mt-auto">
                  <p className="mb-2 text-xs uppercase tracking-wider text-white/50">
                    Language
                  </p>
                  <div className="flex flex-col gap-1">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          handleLanguageChange(lang.code);
                          setMobileOpen(false);
                        }}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/90 hover:bg-white/5"
                      >
                        <span>{lang.label}</span>
                        {currentLocale === lang.code && (
                          <Check className="h-4 w-4 text-blue-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
