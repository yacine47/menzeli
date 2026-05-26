"use client";

import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import AnimatedNumber from "@/components/ui/basic-number";
import { ConfigSite } from "@/lib/conf";
import { Shield, Cpu, Handshake, ArrowRight, MapPin, Building2, Users } from "lucide-react";

const stats = [
  { key: "listings", value: 12000, suffix: "+", Icon: Building2 },
  { key: "users", value: 45000, suffix: "+", Icon: Users },
  { key: "cities", value: 48, suffix: "", Icon: MapPin },
];

const values = [
  { key: "transparency", Icon: Shield },
  { key: "technology", Icon: Cpu },
  { key: "trust", Icon: Handshake },
] as const;

const team = [
  { name: "Yacine Boudiaf", role: "Co-Founder & CEO", img: "1519244703995-f4e0f30006d5" },
  { name: "Amira Mansouri", role: "CTO", img: "1517841905240-472988babdf9" },
  { name: "Karim Benali", role: "Head of Product", img: "1506794778202-cad84cf45f1d" },
  { name: "Yasmine Hadj", role: "Lead Designer", img: "1531746020798-e6953c6e8e04" },
  { name: "Riadh Toumi", role: "Head of Marketing", img: "1472099645785-5658abf4ff4e" },
  { name: "Nadia Cherif", role: "Customer Success", img: "1438761681033-6461ffad8d80" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, ease, delay },
  };
}

export default function AboutContent() {
  const { t } = useTranslation(["about", "common"]);

  return (
    <main className="overflow-hidden">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center pt-20 pb-16">
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Soft blue radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,oklch(60.483%_0.21664_257.23/0.08),transparent)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {t("about:badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease, delay: 0.1 }}
              className="text-5xl font-black tracking-tight sm:text-7xl leading-[1.05] text-foreground"
            >
              {t("about:hero.line1")}
              <br />
              <span className="relative text-primary">
                {t("about:hero.line2")}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M2 6C60 2 150 1 298 3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease, delay: 0.2 }}
              className="mt-10 max-w-lg text-lg leading-8 text-muted-foreground"
            >
              {t("about:mission.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease, delay: 0.3 }}
              className="mt-10"
            >
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-105 active:scale-100"
              >
                {t("about:cta.button")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Image with floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-md ml-auto">
              <div className="absolute inset-0 rounded-3xl border-2 border-primary/10 rotate-3" />
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format&fit=crop"
                  alt="Modern Algerian property"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-background/90 p-4 shadow-xl backdrop-blur-sm">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
                  {t("about:stats.listings")}
                </p>
                <p className="text-3xl font-black text-foreground">12K+</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats band ───────────────────────────────────────────── */}
      <section className="bg-foreground text-background py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {stats.map(({ key, value, suffix, Icon }, i) => (
              <motion.div
                key={key}
                {...reveal(i * 0.1)}
                className="flex flex-col items-center text-center sm:border-r sm:border-background/10 last:border-0"
              >
                <Icon className="mb-4 h-7 w-7 opacity-50" />
                <div className="text-5xl font-black sm:text-6xl">
                  <AnimatedNumber value={value} suffix={suffix} />
                </div>
                <p className="mt-3 text-sm font-medium uppercase tracking-widest opacity-60">
                  {/* @ts-ignore */}
                  {t(`about:stats.${key}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Mission & Values ─────────────────────────────────────── */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left */}
            <div>
              <motion.p {...reveal(0)} className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-5">
                {t("about:mission.title")}
              </motion.p>
              <motion.h2 {...reveal(0.08)} className="text-4xl font-black tracking-tight sm:text-5xl text-foreground leading-tight">
                {t("about:values.heading")}
              </motion.h2>
              <motion.p {...reveal(0.16)} className="mt-6 text-lg leading-8 text-muted-foreground max-w-md">
                {t("about:values.subheading")}
              </motion.p>
              <motion.div {...reveal(0.24)} className="mt-10 h-px w-24 bg-primary/40" />
            </div>

            {/* Right: value cards */}
            <div className="flex flex-col gap-6">
              {values.map(({ key, Icon }, i) => (
                <motion.div
                  key={key}
                  {...reveal(i * 0.12)}
                  className="group relative flex gap-6 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md hover:shadow-primary/5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">
                      {/* @ts-ignore */}
                      {t(`about:values.${key}.title`)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                      {/* @ts-ignore */}
                      {t(`about:values.${key}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Full-bleed image with quote ──────────────────────────── */}
      <section className="relative h-[480px] sm:h-[600px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.1.0&auto=format&fit=crop&w=2832&q=80"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-foreground/80 via-foreground/40 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-16 px-6 lg:px-16">
          <motion.blockquote {...reveal(0)} className="rtl:text-right">
            <p className="text-2xl sm:text-3xl font-bold leading-snug text-white max-w-lg">
              &ldquo;{t("about:quote.text")}&rdquo;
            </p>
            <footer className="mt-4 text-sm font-medium text-white/60">
              — {ConfigSite.siteName} {t("about:quote.team")}
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* ─── Team ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.p {...reveal(0)} className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-5 text-center">
            {t("about:team.eyebrow")}
          </motion.p>
          <motion.h2 {...reveal(0.08)} className="text-4xl font-black tracking-tight sm:text-5xl text-foreground text-center leading-tight">
            {t("about:team.title")}
          </motion.h2>
          <motion.p {...reveal(0.16)} className="mt-6 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            {t("about:team.description")}
          </motion.p>

          <ul className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {team.map((member, i) => (
              <motion.li
                key={member.name}
                {...reveal(i * 0.07)}
                className="flex flex-col items-center text-center"
              >
                <div className="h-20 w-20 overflow-hidden rounded-2xl ring-2 ring-border shadow-sm mb-4">
                  <Image
                    src={`https://images.unsplash.com/photo-${member.img}?auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80`}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-bold text-foreground leading-tight">{member.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-snug">{member.role}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            {...reveal(0)}
            className="relative overflow-hidden rounded-3xl bg-primary px-8 py-20 text-center shadow-2xl shadow-primary/30"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <motion.h2 {...reveal(0)} className="relative text-4xl font-black text-primary-foreground sm:text-5xl">
              {t("about:cta.title")}
            </motion.h2>
            <motion.p {...reveal(0.1)} className="relative mt-6 text-lg text-primary-foreground/75 max-w-xl mx-auto">
              {t("about:cta.description")}
            </motion.p>
            <motion.div {...reveal(0.2)} className="relative mt-10">
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-sm font-bold text-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-100"
              >
                {t("about:cta.button")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
