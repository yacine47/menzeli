"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Zap, Trophy, Coins, ArrowRight, type LucideIcon } from "lucide-react";

type Locale = "ar" | "en" | "fr";

type Props = {
  locale: Locale;
};

type Point = {
  icon: LucideIcon;
  key: string;
};

const POINTS: Point[] = [
  { icon: Zap, key: "boost.point1" },
  { icon: Trophy, key: "boost.point2" },
  { icon: Coins, key: "boost.point3" },
];

type Row = {
  rank: number;
  medal: string;
  title: string;
  location: string;
  coins: number;
  highlight?: boolean;
};

const ROWS: Row[] = [
  { rank: 1, medal: "🥇", title: "Villa F5", location: "Hydra", coins: 850 },
  { rank: 2, medal: "🥈", title: "Appart F3", location: "Bab Ezzouar", coins: 620 },
  { rank: 3, medal: "🥉", title: "Studio", location: "Cheraga", coins: 410 },
  { rank: 4, medal: "⚡", title: "F4", location: "Kouba", coins: 300, highlight: true },
];

export default function BoostPromoSection({ locale }: Props) {
  const { t: tRaw } = useTranslation("common");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = tRaw as (key: string, options?: Record<string, any>) => string;

  return (
    <section className="relative overflow-hidden bg-[#0D0D0F] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full bg-[#F59E0B]/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#0078FD]/15 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left: copy */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F59E0B]"
            >
              <Zap className="h-3.5 w-3.5" />
              {t("boost.badge")}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {t("boost.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-lg text-base text-[#9CA3AF]"
            >
              {t("boost.subtitle")}
            </motion.p>

            <ul className="mt-8 space-y-4">
              {POINTS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.li
                    key={p.key}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[#F59E0B]/15 ring-1 ring-[#F59E0B]/30">
                      <Icon className="h-4 w-4 text-[#F59E0B]" />
                    </span>
                    <span className="text-sm text-white/85">{t(p.key)}</span>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10"
            >
              <Link
                href={`/${locale}/listings`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(245,158,11,0.6)] transition-all hover:-translate-y-0.5"
              >
                {t("boost.cta")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </motion.div>
          </div>

          {/* Right: rank widget */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-md">
              {/* Title */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <p className="text-sm font-semibold text-white">
                  {t("boost.leaderboard_title")}
                </p>
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  LIVE
                </span>
              </div>

              {/* Rows */}
              <div className="mt-2 flex flex-col gap-2">
                {ROWS.map((row, i) => (
                  <motion.div
                    key={row.rank}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: 0.2 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`flex items-center justify-between gap-3 rounded-xl p-3 ${
                      row.highlight
                        ? "bg-[#0078FD]/15 ring-1 ring-[#0078FD]/40"
                        : "bg-white/5"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white/10 text-base">
                        {row.medal}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {row.highlight && (
                            <span className="me-1.5 inline-flex items-center rounded-md bg-[#0078FD]/30 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                              {t("boost.your_listing")}
                            </span>
                          )}
                          {row.title}
                        </p>
                        <p className="truncate text-xs text-white/60">
                          {row.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-end rtl:items-start rtl:text-start">
                      <p className="text-sm font-bold text-[#F59E0B]">
                        {row.coins}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-white/50">
                        {t("boost.coins")}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer hint */}
              <div className="mt-4 rounded-xl border border-dashed border-[#0078FD]/40 bg-[#0078FD]/5 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0078FD]">
                    {t("boost.your_rank")} 🥉
                  </span>
                  <span className="text-white/60">
                    {t("boost.balance_after", { coins: 200 })}
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
