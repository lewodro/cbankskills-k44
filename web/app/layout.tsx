import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "CN Finance — Claude AI Skills for Financial Services",
  description:
    "Production-ready Claude AI skills for investment banking, equity research, private equity, fund administration, and wealth management.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
      >
        <body>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}
