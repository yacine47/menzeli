"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Trophy,
  Eye,
  Star,
  BedDouble,
  Layers,
  Maximize2,
  MapPin,
} from "lucide-react";

type Locale = "ar" | "en" | "fr";

type Props = {
  locale: Locale;
};

const POINTS: string[] = [
  "agents.point1",
  "agents.point2",
  "agents.point3",
  "agents.point4",
];

export default function ForAgentsSection({ locale }: Props) {
  const { t: tRaw } = useTranslation("common");
  const t = tRaw as (key: string) => string;

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left: copy */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#0078FD]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0078FD]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0078FD]" />
              {t("agents.badge")}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl lg:text-5xl"
            >
              {t("agents.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-lg text-base text-[#6B7280]"
            >
              {t("agents.subtitle")}
            </motion.p>

            <ul className="mt-8 space-y-4">
              {POINTS.map((key, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#0078FD]/15">
                    <Check className="h-3.5 w-3.5 text-[#0078FD]" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-[#374151]">{t(key)}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link
                href={`/${locale}/add-listing/entry`}
                className="inline-flex items-center gap-2 rounded-full bg-[#0078FD] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(0,120,253,0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#064BCD]"
              >
                {t("agents.cta_post")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link
                href={`/${locale}/profile/verify-identity`}
                className="inline-flex items-center gap-2 rounded-full border border-[#0078FD]/30 bg-white px-6 py-3 text-sm font-semibold text-[#0078FD] transition-colors hover:bg-[#0078FD]/5"
              >
                <ShieldCheck className="h-4 w-4" />
                {t("agents.cta_verify")}
              </Link>
            </motion.div>
          </div>

          {/* Right: mock listing card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* Decorative mesh background */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-[#0078FD]/15 via-transparent to-[#2FE0D7]/15 blur-2xl"
            />

            <div className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-[#E5E7EB]">
              {/* Photo */}
              <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[#0078FD]/20 to-[#064BCD]/30">
                <Image
                  src="/images/heroSection.png"
                  alt=""
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                {/* Badges */}
                <div className="absolute left-3 top-3 flex flex-col gap-2 rtl:left-auto rtl:right-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                    <ShieldCheck className="h-3 w-3" />
                    {t("agents.mock_verified")}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F59E0B] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                    <Trophy className="h-3 w-3" />
                    {t("agents.mock_boost")}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-[#111827]">
                      {t("agents.mock_title")}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#6B7280]">
                      <MapPin className="h-3 w-3" />
                      Hydra, Algiers
                    </p>
                  </div>
                  <p className="flex-none text-lg font-bold text-[#0078FD]">
                    {t("agents.mock_price")}
                  </p>
                </div>

                {/* Details */}
                <div className="mt-4 flex items-center gap-4 border-t border-[#E5E7EB] pt-4 text-xs text-[#6B7280]">
                  <span className="inline-flex items-center gap-1">
                    <BedDouble className="h-3.5 w-3.5" />
                    {t("agents.mock_beds")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5" />
                    {t("agents.mock_floor")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Maximize2 className="h-3.5 w-3.5" />
                    {t("agents.mock_surface")}
                  </span>
                </div>

                {/* Stats */}
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-[#6B7280]">
                    <Eye className="h-3.5 w-3.5" />
                    {t("agents.mock_views")}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#F59E0B]">
                    <Star className="h-3.5 w-3.5 fill-[#F59E0B]" />
                    {t("agents.mock_rating")}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
