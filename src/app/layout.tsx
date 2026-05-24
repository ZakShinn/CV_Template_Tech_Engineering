import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { getThemeCssBlock } from "@/color/theme";
import { getFontCssBlock } from "@/font/config";
import { appConfig } from "@/data/config";
import { defaultResume } from "@/data/resume";
import { buildPersonJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // khớp fonts.sans.variable trong src/font/config.ts
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains", // khớp fonts.mono.variable trong src/font/config.ts
  display: "swap",
});

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.description,
  metadataBase: new URL(appConfig.siteUrl),
  openGraph: {
    title: appConfig.title,
    description: appConfig.description,
    type: "website",
    url: appConfig.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.title,
    description: appConfig.description,
  },
  robots: { index: true, follow: true },
};

const personJsonLd = buildPersonJsonLd({
  name: defaultResume.personal.fullName,
  jobTitle: defaultResume.personal.title,
  email: defaultResume.personal.contact.email,
  url: defaultResume.personal.contact.portfolio,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultResume.meta.locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `${getThemeCssBlock()}\n${getFontCssBlock()}`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
