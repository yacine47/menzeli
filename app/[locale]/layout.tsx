import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import { QueryProvider } from "@/components/providers/query";
import { AuthProvider } from "@/components/providers/auth";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";
import { ConfigSite } from "@/lib/conf";
import { Toaster } from "@/components/ui/sonner";
import { WidgetProvider } from "../../components/providers/widget-provider";

const ibm = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${ConfigSite.siteName}`,
  description: "Largest Real Estate Marketplace in Algeria",
  keywords: `${ConfigSite.siteName}, Real Estate, Algeria, Men, Women, Marketplace`,
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const { resources } = await initTranslations(locale, ["common"]);

  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={`${ibm.variable} font-sans antialiased`}
      >
        <TranslationsProvider locale={locale} namespaces={["common"]} resources={resources}>
          <QueryProvider>
            <AuthProvider>
              <WidgetProvider>{children}</WidgetProvider>
            </AuthProvider>
          </QueryProvider>
        </TranslationsProvider>
        <Toaster />
      </body>
    </html>
  );
}
