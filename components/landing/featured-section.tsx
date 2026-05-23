"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ListingResource } from "@/api";
import PropertyCard from "@/components/properties/property-card";

type Locale = "ar" | "en" | "fr";

type Props = {
  listings: ListingResource[];
  locale: Locale;
};

export default function FeaturedSection({ listings, locale }: Props) {
  const { t } = useTranslation("common");

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0078FD]/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#0078FD] mb-4"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0078FD]" />
              {t("featured.eyebrow")}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl"
            >
              {t("featured.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-base text-[#6B7280] max-w-xl"
            >
              {t("featured.subtitle")}
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
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#0078FD]/20 bg-[#0078FD]/5 px-5 py-2 text-sm font-semibold text-[#0078FD] transition-colors hover:bg-[#0078FD]/10"
            >
              {t("featured.view_all")}
              <Image
                src="/images/mmb90ocm-gco1687.svg"
                alt="Arrow"
                className="rtl:rotate-180"
                width={14}
                height={14}
              />
            </Link>
          </motion.div>
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {listings.map((listing, i) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <PropertyCard listing={listing} locale={locale} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="col-span-3 text-center py-16 text-[#6B7280]">
            {t("featured.no_listings")}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 flex justify-center sm:hidden"
        >
          <Link
            href={`/${locale}/listings`}
            className="inline-flex items-center gap-2 rounded-full border border-[#0078FD]/20 bg-[#0078FD]/5 px-5 py-2 text-sm font-semibold text-[#0078FD]"
          >
            {t("featured.view_all")}
            <Image
              src="/images/mmb90ocm-gco1687.svg"
              alt="Arrow"
              width={14}
              height={14}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
