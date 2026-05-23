"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Home,
  LayoutDashboard,
  Map,
  Briefcase,
  TreePine,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { usePropertyTypes } from "@/hooks/use-details";

type Locale = "ar" | "en" | "fr";

type Props = {
  locale: Locale;
};

const LISTING_TYPES: Array<{ value: string; labelKey: string }> = [
  { value: "rent", labelKey: "categories.type_rent" },
  { value: "sale", labelKey: "categories.type_sale" },
  { value: "exchange", labelKey: "categories.type_exchange" },
];

// Map property type display name (lowercased) → icon. Falls back to Home.
function iconForType(name: string): LucideIcon {
  const k = name.toLowerCase();
  if (k.includes("apart") || k.includes("شقة") || k.includes("appart")) return Building2;
  if (k.includes("villa") || k.includes("house") || k.includes("maison") || k.includes("فيلا"))
    return Home;
  if (k.includes("studio")) return LayoutDashboard;
  if (k.includes("land") || k.includes("plot") || k.includes("terrain") || k.includes("أرض"))
    return Map;
  if (k.includes("office") || k.includes("commerc") || k.includes("مكتب") || k.includes("تجاري"))
    return Briefcase;
  if (k.includes("farm") || k.includes("rural") || k.includes("ferme") || k.includes("مزرعة"))
    return TreePine;
  return Home;
}

export default function CategoriesSection({ locale }: Props) {
  const { t: tRaw } = useTranslation("common");
  const t = tRaw as (key: string) => string;
  const { data: propertyTypes, isLoading } = usePropertyTypes({ locale });

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-end md:justify-between md:text-start rtl:md:text-end">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#0078FD]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0078FD]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0078FD]" />
              {t("categories.eyebrow")}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl"
            >
              {t("categories.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-base text-[#6B7280]"
            >
              {t("categories.subtitle")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              href={`/${locale}/listings`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0078FD] hover:text-[#064BCD] md:mt-0"
            >
              {t("categories.all")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </motion.div>
        </div>

        {/* Listing-type pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-3 md:justify-start rtl:md:justify-end">
          {LISTING_TYPES.map((lt, i) => (
            <motion.div
              key={lt.value}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                href={`/${locale}/listings?listingType=${lt.value}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#0078FD]/20 bg-[#0078FD]/5 px-5 py-2.5 text-sm font-semibold text-[#0078FD] transition-all hover:border-[#0078FD]/40 hover:bg-[#0078FD]/10"
              >
                {t(lt.labelKey)}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Property-type cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-28 animate-pulse rounded-2xl bg-[#F3F4F6]"
                />
              ))
            : (propertyTypes ?? []).map((type, i) => {
                const Icon = iconForType(type.name);
                return (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={`/${locale}/listings?propertyTypeId=${type.id}`}
                      className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-[#F8F9FC] p-5 ring-1 ring-transparent transition-all hover:-translate-y-1 hover:bg-[#0078FD]/5 hover:ring-[#0078FD]/30 hover:shadow-sm"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white ring-1 ring-[#E5E7EB] transition-colors group-hover:bg-[#0078FD] group-hover:ring-[#0078FD]">
                        <Icon className="h-6 w-6 text-[#0078FD] transition-colors group-hover:text-white" />
                      </div>
                      <span className="text-center text-sm font-medium text-[#111827]">
                        {type.name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
