"use client";

import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Star, Quote } from "lucide-react";

// TODO: replace with API-fetched top reviews once `getReviews` is available.
const TESTIMONIALS = [1, 2, 3, 4, 5, 6] as const;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Card({ index }: { index: number }) {
  const { t: tRaw } = useTranslation("common");
  const t = tRaw as (key: string) => string;
  const name = t(`testimonials.name_${index}`);
  const role = t(`testimonials.role_${index}`);
  const quote = t(`testimonials.quote_${index}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: ((index - 1) % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-[#0078FD]/20"
    >
      <Quote
        aria-hidden="true"
        className="absolute right-5 top-5 h-8 w-8 text-[#0078FD]/10 rtl:left-5 rtl:right-auto"
      />

      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="mt-4 flex-1 text-sm leading-relaxed text-[#374151]">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3 border-t border-[#F3F4F6] pt-4">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#0078FD]/15 text-sm font-bold text-[#0078FD]">
          {getInitials(name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#111827]">
            {name}
          </p>
          <p className="truncate text-xs text-[#6B7280]">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const { t: tRaw } = useTranslation("common");
  const t = tRaw as (key: string) => string;

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
            {t("testimonials.eyebrow")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl lg:text-5xl"
          >
            {t("testimonials.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base text-[#6B7280]"
          >
            {t("testimonials.subtitle")}
          </motion.p>
        </div>

        {/* Cards — horizontal scroll on mobile, grid on md+ */}
        <div className="mt-14 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TESTIMONIALS.map((i) => (
            <div
              key={i}
              className="min-w-[85%] snap-center sm:min-w-[60%] md:min-w-0"
            >
              <Card index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
