"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ChevronDown, HelpCircle } from "lucide-react";

const ALL_ITEMS = Array.from({ length: 12 }, (_, i) => i + 1);
const INITIAL_VISIBLE = 6;

export default function FaqSection() {
  const { t: tRaw } = useTranslation("common");
  const t = tRaw as (key: string) => string;
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? ALL_ITEMS : ALL_ITEMS.slice(0, INITIAL_VISIBLE);

  return (
    <section className="bg-[#F8F9FC] py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#0078FD]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0078FD]"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            {t("faq.eyebrow")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl lg:text-5xl"
          >
            {t("faq.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base text-[#6B7280]"
          >
            {t("faq.subtitle")}
          </motion.p>
        </div>

        {/* Items */}
        <div className="mt-12 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#E5E7EB]">
          {visible.map((n, i) => {
            const isOpen = openIndex === n;
            return (
              <div
                key={n}
                className={i > 0 ? "border-t border-[#F3F4F6]" : ""}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : n)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start transition-colors hover:bg-[#F8F9FC]"
                >
                  <span className="text-sm font-semibold text-[#111827] sm:text-base">
                    {t(`faq.q${n}`)}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex h-7 w-7 flex-none items-center justify-center rounded-full transition-colors ${
                      isOpen
                        ? "bg-[#0078FD] text-white"
                        : "bg-[#F3F4F6] text-[#6B7280]"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.28,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-sm leading-relaxed text-[#6B7280]">
                        {t(`faq.a${n}`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Show more toggle */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-[#0078FD]/30 bg-white px-5 py-2.5 text-sm font-semibold text-[#0078FD] transition-colors hover:bg-[#0078FD]/5"
          >
            {showAll ? t("faq.show_less") : t("faq.show_more")}
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </button>
        </div>
      </div>
    </section>
  );
}
