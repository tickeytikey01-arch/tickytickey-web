import CookieConsentBanner from "@/components/CookieConsentBanner";
import SmoothScroll from "@/components/SmoothScroll";
import KeepAliveHeartbeat from "@/components/KeepAliveHeartbeat";
import type { Metadata } from "next";
import { Caveat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TickyTICKEY | Your Barangay Health Partner",
  description: "TickyTICKEY connects residents, Barangay Health Workers, and local leaders through easy access to health services, information, and care.",
  icons: {
    icon: "/assets/app-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased text-gray-800 bg-[#fbfdfa] min-h-screen selection:bg-[#e2f3e5] selection:text-[#184e27]">
        <KeepAliveHeartbeat />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <CookieConsentBanner />
      </body>
    </html>
  );
}
