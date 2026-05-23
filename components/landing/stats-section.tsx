"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";

type Stat = {
  i18nKey: string;
  target: number;
  format: (n: number) => string;
};

// TODO: replace with live values from an analytics/listings count API.
const STATS: Stat[] = [
  {
    i18nKey: "stats.listings",
    target: 10000,
    format: (n) => `${Math.floor(n / 1000)}K+`,
  },
  {
    i18nKey: "stats.users",
    target: 50000,
    format: (n) => `${Math.floor(n / 1000)}K+`,
  },
  {
    i18nKey: "stats.rating",
    target: 48,
    format: (n) => `${(n / 10).toFixed(1)}★`,
  },
  {
    i18nKey: "stats.wilayas",
    target: 48,
    format: (n) => `${Math.floor(n)}`,
  },
];

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(target);
      return;
    }
    const startTime = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reduced]);

  return value;
}

function StatCell({ stat, inView }: { stat: Stat; inView: boolean }) {
  const value = useCountUp(stat.target, inView);
  const { t: tRaw } = useTranslation("common");
  const t = tRaw as (key: string) => string;

  return (
    <div className="relative px-6 py-2 text-center">
      <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {stat.format(value)}
      </p>
      <p className="mt-2 text-xs font-medium uppercase tracking-widest text-white/70">
        {t(stat.i18nKey)}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const { t: tRaw } = useTranslation("common");
  const t = tRaw as (key: string) => string;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-r from-[#064BCD] via-[#0078FD] to-[#064BCD] py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,_rgba(255,255,255,0.12)_0%,_transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
          {t("stats.eyebrow")}
        </p>
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:divide-x sm:divide-white/20 rtl:sm:divide-x-reverse">
          {STATS.map((stat) => (
            <StatCell key={stat.i18nKey} stat={stat} inView={inView} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
