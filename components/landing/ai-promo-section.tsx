"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Bot, Check, Mic, ArrowRight } from "lucide-react";

const BULLETS = ["ai.bullet1", "ai.bullet2", "ai.bullet3"];

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white/70"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

export default function AiPromoSection() {
  const { t: tRaw } = useTranslation("common");
  const t = tRaw as (key: string) => string;

  return (
    <section className="relative overflow-hidden bg-[#F8F9FC] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-[#2FE0D7]/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left: chat mockup */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 mx-auto w-full max-w-sm lg:order-1"
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 rounded-[2rem] bg-[#0078FD]/25 blur-3xl"
              />
              <div className="overflow-hidden rounded-3xl bg-[#0D0D0F] shadow-2xl ring-1 ring-white/10">
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-[#0078FD]/20 to-transparent px-5 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0078FD] to-[#2FE0D7]">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">
                      {t("ai.badge")}
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      {t("ai.online")}
                    </p>
                  </div>
                </div>

                {/* Chat thread */}
                <div className="flex flex-col gap-3 px-5 py-6">
                  {/* User msg */}
                  <motion.div
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex justify-end rtl:justify-start"
                  >
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0078FD] px-4 py-2.5 text-sm text-white shadow-md rtl:rounded-tl-sm rtl:rounded-tr-2xl">
                      {t("ai.mock_user")}
                    </div>
                  </motion.div>

                  {/* AI typing */}
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="flex justify-start rtl:justify-end"
                  >
                    <div className="rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3 ring-1 ring-white/10 rtl:rounded-tl-2xl rtl:rounded-tr-sm">
                      <TypingDots />
                    </div>
                  </motion.div>

                  {/* AI msg */}
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                    className="flex justify-start rtl:justify-end"
                  >
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-2.5 text-sm leading-relaxed text-white ring-1 ring-white/10 rtl:rounded-tl-2xl rtl:rounded-tr-sm">
                      {t("ai.mock_ai")}
                    </div>
                  </motion.div>
                </div>

                {/* Input bar (mock) */}
                <div className="flex items-center gap-2 border-t border-white/10 bg-black/30 px-4 py-3">
                  <div className="h-9 flex-1 rounded-full bg-white/5 ring-1 ring-white/10" />
                  <button
                    type="button"
                    aria-label="Voice input"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0078FD] to-[#2FE0D7] text-white"
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: copy */}
          <div className="order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#2FE0D7]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0e8a83]"
            >
              <Bot className="h-3.5 w-3.5" />
              {t("ai.badge")}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl lg:text-5xl"
            >
              {t("ai.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-lg text-base text-[#6B7280]"
            >
              {t("ai.subtitle")}
            </motion.p>

            <ul className="mt-8 space-y-4">
              {BULLETS.map((key, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#2FE0D7]/20">
                    <Check className="h-3.5 w-3.5 text-[#0e8a83]" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-[#374151]">{t(key)}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10"
            >
              <Link
                href="#app-download"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0078FD] to-[#2FE0D7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(0,120,253,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_rgba(0,120,253,0.8)]"
              >
                {t("ai.cta")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
