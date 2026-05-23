import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/providers/TranslationsProvider";

import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import ChatBotPopover from "@/components/shared/chat-bot-popover";
import { ListingResource } from "@/api";
import { searchListings } from "@/lib/api/search-listings";
import HeroSection from "@/components/landing/hero-section";
import AppDownloadSection from "@/components/landing/app-download-section";
import FeaturedSection from "@/components/landing/featured-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import CategoriesSection from "@/components/landing/categories-section";
import WhyManzeliSection from "@/components/landing/why-manzeli-section";
import StatsSection from "@/components/landing/stats-section";
import AiPromoSection from "@/components/landing/ai-promo-section";
import BoostPromoSection from "@/components/landing/boost-promo-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import ForAgentsSection from "@/components/landing/for-agents-section";
import FaqSection from "@/components/landing/faq-section";

type Locale = "ar" | "en" | "fr";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, ["common"]);

  let featuredListings: ListingResource[] = [];
  try {
    const { listings } = await searchListings({ perPage: 6 });
    featuredListings = listings;
  } catch (error) {
    console.error("Failed to fetch featured listings:", error);
  }

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={["common"]}
      resources={resources}
    >
      <div className="min-h-screen bg-[#F8F9FC] font-sans text-[#111827]">
        <Header page="home" />
        <ChatBotPopover />

        <main>
          {/* 1 — Hero */}
          <HeroSection locale={locale as Locale} />

          {/* 2 — Featured Listings */}
          <FeaturedSection listings={featuredListings} locale={locale as Locale} />

          {/* 3 — How It Works */}
          <HowItWorksSection />

          {/* 4 — Property Categories */}
          <CategoriesSection locale={locale as Locale} />

          {/* 5 — Why Manzeli */}
          <WhyManzeliSection />

          {/* 6 — Stats */}
          <StatsSection />

          {/* 7 — AI Chatbot Promo */}
          <AiPromoSection />

          {/* 8 — Coin Boost Promo */}
          <BoostPromoSection locale={locale as Locale} />

          {/* 9 — Testimonials */}
          <TestimonialsSection />

          {/* 10 — For Agents & Owners */}
          <ForAgentsSection locale={locale as Locale} />

          {/* 11 — FAQ */}
          <FaqSection />

          {/* 12 — App Download */}
          <AppDownloadSection />
        </main>

        <Footer />
      </div>
    </TranslationsProvider>
  );
}
