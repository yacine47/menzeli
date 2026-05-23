"use client";

import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Home, MapPin, CheckCircle2 } from "lucide-react";
import HeroSearch from "./hero-search";

type Props = {
  locale: "ar" | "en" | "fr";
  videoSrc?: string;
  posterSrc?: string;
};

const DEFAULT_VIDEO_SRC =
  "https://videos.pexels.com/video-files/13761465/13761465-hd_1920_1080_30fps.mp4";

const STATS = [
  { icon: Home, tKey: "hero.stat_listings" as const },
  { icon: MapPin, tKey: "hero.stat_wilayas" as const },
  { icon: CheckCircle2, tKey: "hero.stat_free" as const },
];

export default function HeroSection({
  locale,
  videoSrc = DEFAULT_VIDEO_SRC,
  posterSrc = "/images/heroSection.png",
}: Props) {
  const { t } = useTranslation("common");

  return (
    <section className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-zinc-950 pb-24 pt-32 sm:pb-32 sm:pt-44">
      {/* Video background */}
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterSrc}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Dark overlay with brand blue bleed from top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#064BCD]/55 via-[#0D0D0F]/60 to-[#0D0D0F]/92"
      />
      {/* Radial glow at top-center */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,_rgba(0,120,253,0.28)_0%,_transparent_70%)]"
      />
      {/* Edge vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(13,13,15,0.5)_100%)]"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2FE0D7] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2FE0D7]" />
            </span>
            {t("hero.badge")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-5xl text-center text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[5rem]"
          dangerouslySetInnerHTML={{ __html: t("hero.title") }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-white/65 sm:text-lg"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {STATS.map(({ icon: Icon, tKey }, i) => (
            <span
              key={tKey}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80"
            >
              {i > 0 && (
                <span className="mr-1 hidden h-4 w-px bg-white/20 sm:block" />
              )}
              <Icon className="h-4 w-4 text-[#2FE0D7]" />
              {t(tKey)}
            </span>
          ))}
        </motion.div>

        {/* Search bar */}
        <div className="mt-12 w-full sm:mt-16">
          <HeroSearch locale={locale} />
        </div>
      </div>
    </section>
  );
}
