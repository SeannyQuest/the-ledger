import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { ModeProvider } from "@/context/ModeContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daonra | Follow the Money. Name What You See.",
  description:
    "The system isn't broken. It's working as designed. Daonra tracks money in politics, exposes who benefits from policy decisions, and shows what's possible when people pay attention.",
  keywords: [
    "campaign finance",
    "lobbying",
    "PAC",
    "super PAC",
    "government contracts",
    "political donations",
    "dark money",
    "FEC",
    "money in politics",
    "class politics",
    "who benefits",
    "power vs people",
    "follow the money",
    "civic engagement",
    "corporate capture",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
      >
        <ModeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ModeProvider>
      </body>
    </html>
  );
}
