"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import {
  Search,
  MapPin,
  Phone,
  Camera,
  Zap,
  Star,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type Step = {
  icon: LucideIcon;
  titleKey: string;
  bodyKey: string;
};

const BUYER_STEPS: Step[] = [
  { icon: Search, titleKey: "how.buyer.step1_title", bodyKey: "how.buyer.step1_body" },
  { icon: MapPin, titleKey: "how.buyer.step2_title", bodyKey: "how.buyer.step2_body" },
  { icon: Phone, titleKey: "how.buyer.step3_title", bodyKey: "how.buyer.step3_body" },
];

const SELLER_STEPS: Step[] = [
  { icon: Camera, titleKey: "how.seller.step1_title", bodyKey: "how.seller.step1_body" },
  { icon: Zap, titleKey: "how.seller.step2_title", bodyKey: "how.seller.step2_body" },
  { icon: Star, titleKey: "how.seller.step3_title", bodyKey: "how.seller.step3_body" },
];

type Tab = "buyer" | "seller";

export default function HowItWorksSection() {
  const { t: tRaw } = useTranslation("common");
  const t = tRaw as (key: string) => string;
  const [tab, setTab] = useState<Tab>("buyer");
  const steps = tab === "buyer" ? BUYER_STEPS : SELLER_STEPS;

  return (
    <section className="bg-[#F8F9FC] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#0078FD]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0078FD]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0078FD]" />
            {t("how.eyebrow")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl lg:text-5xl"
          >
            {t("how.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base text-[#6B7280]"
          >
            {t("how.subtitle")}
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="mt-12 flex justify-center">
          <div
            role="tablist"
            className="relative inline-flex items-center gap-1 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-[#E5E7EB]"
          >
            {(["buyer", "seller"] as Tab[]).map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`relative rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
                  tab === key
                    ? "text-white"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                {tab === key && (
                  <motion.span
                    layoutId="how-tab-active"
                    className="absolute inset-0 -z-0 rounded-xl bg-[#0078FD]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {t(key === "buyer" ? "how.tab_buyer" : "how.tab_seller")}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="relative mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6"
            >
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.titleKey} className="relative">
                    {/* Connector (desktop only) */}
                    {i < steps.length - 1 && (
                      <div className="pointer-events-none absolute left-full top-8 hidden -translate-x-1/2 md:block">
                        <ArrowRight className="h-5 w-5 text-[#0078FD]/40 rtl:rotate-180" />
                      </div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="group relative h-full rounded-2xl bg-white p-7 ring-1 ring-[#E5E7EB] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-[#0078FD]/30"
                    >
                      {/* Step number */}
                      <span className="absolute -top-3 left-7 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0078FD] text-xs font-bold text-white shadow-md">
                        {i + 1}
                      </span>

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0078FD]/10">
                        <Icon className="h-7 w-7 text-[#0078FD]" />
                      </div>

                      <h3 className="mt-5 text-lg font-semibold text-[#111827]">
                        {t(step.titleKey)}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                        {t(step.bodyKey)}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
