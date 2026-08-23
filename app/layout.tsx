import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://daywinner.lol"
  ),
  title: "daywinner.lol : la première place, pour la journée",
  description:
    "Paie pour prendre la première place du jour. Le classement repart de zéro toutes les 24h, avec règle anti-snipe : impossible de voler la victoire dans les 2 dernières minutes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-zinc-950">
        <div className="sta-noise" aria-hidden />
        {children}
      </body>
    </html>
  );
}
