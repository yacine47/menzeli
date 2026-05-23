import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/providers/TranslationsProvider';
import Header from "@/components/shared/header";
import ContactSection from '@/components/shared/contact';
import Footer from '@/components/shared/footer';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, ['common', 'contact']);

  return (
    <TranslationsProvider locale={locale} namespaces={['common', 'contact']} resources={resources}>
      <div className="min-h-screen bg-white font-sans text-zinc-900">
        <Header />
        <ContactSection />
        <Footer />
      </div>
    </TranslationsProvider>
  );
}
