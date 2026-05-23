"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

// Remove inline SVG components - using SVG files instead

const FLOAT = {
  animate: { y: [0, -12, 0] },
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
};

export default function AppDownloadSection() {
  const { t } = useTranslation("common");
  const reduced = useReducedMotion();

  return (
    <section id="app-download" className="relative overflow-hidden bg-[#0D0D0F] py-24 sm:py-32">
      {/* Background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#0078FD]/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-0 h-[400px] w-[400px] rounded-full bg-[#064BCD]/15 blur-[100px]"
      />
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,120,253,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,120,253,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-12">

          {/* ── Left: copy + CTAs ── */}
          <div className="flex-1 text-center lg:text-start rtl:lg:text-right">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0078FD]/25 bg-[#0078FD]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0078FD]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0078FD]" />
                {t("app.badge")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {t("app.title").split("\n").map((line, i) => (
                <span key={i} className="block">
                  {i === 0 ? (
                    line
                  ) : (
                    <span className="bg-gradient-to-r from-[#0078FD] to-[#2FE0D7] bg-clip-text text-transparent">
                      {line}
                    </span>
                  )}
                </span>
              ))}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-md text-base leading-relaxed text-white/60 lg:max-w-sm"
            >
              {t("app.subtitle")}
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex items-center justify-center gap-8 lg:justify-start rtl:lg:justify-end"
            >
              {[
                t("app.stat_listings"),
                t("app.stat_rating"),
                t("app.stat_users"),
              ].map((label, i) => {
                const [value, ...rest] = label.split(" ");
                return (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-bold text-white">{value}</p>
                    <p className="mt-0.5 text-xs text-white/50">{rest.join(" ")}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* Download buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start rtl:lg:justify-end"
            >
              {/* App Store — black pill, white everything */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#"
                  className="flex items-center gap-3.5 rounded-2xl bg-black px-6 py-3.5 ring-1 ring-white/10 transition-all hover:ring-white/20"
                >
                  <Image
                    src="/images/svgs/apple-app-store-icon.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 brightness-0 invert"
                  />
                  <div className="text-left rtl:text-right">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-white/50">
                      {t("app.available")}
                    </p>
                    <p className="text-base font-semibold leading-tight text-white">
                      {t("app.app_store")}
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Google Play — white pill, dark text + colorful icon */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#"
                  className="flex items-center gap-3.5 rounded-2xl bg-white px-6 py-3.5 shadow-[0_4px_24px_rgba(255,255,255,0.08)] transition-all hover:bg-white/95"
                >
                  <Image
                    src="/images/svgs/google-play-store-icon.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7"
                  />
                  <div className="text-left rtl:text-right">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-[#6B7280]">
                      {t("app.available")}
                    </p>
                    <p className="text-base font-semibold leading-tight text-[#111827]">
                      {t("app.google_play")}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Browse link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="mt-6 flex justify-center lg:justify-start rtl:lg:justify-end"
            >
              <Link
                href="#"
                className="inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white/70"
              >
                {t("promo.find_home.button")}
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </Link>
            </motion.div>
          </div>

          {/* ── Right: phone mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-1 items-center justify-center lg:justify-end min-h-[600px]"
          >
            {/* Glow under phones */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 h-48 w-full -translate-x-1/2 rounded-full bg-[#0078FD]/25 blur-3xl"
            />

            <motion.div
              animate={reduced ? undefined : FLOAT.animate}
              transition={reduced ? undefined : FLOAT.transition}
              className="relative z-10 w-full"
            >
              <Image
                src="/images/heroSection.png"
                alt="Menzili mobile app"
                width={1400}
                height={1500}
                priority
                className="w-full h-auto max-w-none drop-shadow-[0_40px_80px_rgba(0,120,253,0.3)] scale-110 lg:scale-125"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
