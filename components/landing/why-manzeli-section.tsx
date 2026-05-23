"use client";

import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  Bot,
  Zap,
  Globe,
  MapPin,
  Star,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  titleKey: string;
  bodyKey: string;
};

const FEATURES: Feature[] = [
  { icon: ShieldCheck, titleKey: "why.verified_title", bodyKey: "why.verified_body" },
  { icon: Bot, titleKey: "why.ai_title", bodyKey: "why.ai_body" },
  { icon: Zap, titleKey: "why.boost_title", bodyKey: "why.boost_body" },
  { icon: Globe, titleKey: "why.multilang_title", bodyKey: "why.multilang_body" },
  { icon: MapPin, titleKey: "why.map_title", bodyKey: "why.map_body" },
  { icon: Star, titleKey: "why.reviews_title", bodyKey: "why.reviews_body" },
];

export default function WhyManzeliSection() {
  const { t: tRaw } = useTranslation("common");
  const t = tRaw as (key: string) => string;

  return (
    <section className="relative overflow-hidden bg-[#0D0D0F] py-24 sm:py-32">
      {/* Background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-[#0078FD]/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#2FE0D7]/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,120,253,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,120,253,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#2FE0D7]/30 bg-[#2FE0D7]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#2FE0D7]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#2FE0D7]" />
            {t("why.eyebrow")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {t("why.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base text-[#9CA3AF]"
          >
            {t("why.subtitle")}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:ring-[#0078FD]/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0078FD]/15 ring-1 ring-[#0078FD]/30 transition-colors group-hover:bg-[#0078FD]/25">
                  <Icon className="h-6 w-6 text-[#0078FD]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {t(feature.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
                  {t(feature.bodyKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
