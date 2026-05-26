import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/providers/TranslationsProvider';
import Header from "@/components/shared/header";
import Footer from '@/components/shared/footer';
import AboutContent from '@/components/about/AboutContent';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, ['common', 'about']);

  return (
    <TranslationsProvider locale={locale} namespaces={['common', 'about']} resources={resources}>
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Header />
        <AboutContent />
        <Footer />
      </div>
    </TranslationsProvider>
  );
}
