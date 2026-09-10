import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "../lib/wallet-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trestly — Escrow for x402 Payments on Stellar",
  description:
    "Trestly adds a dispute-aware escrow layer to x402 payments on Stellar. Agents pay. Services deliver. Funds settle only when the window closes.",
  openGraph: {
    title: "Trestly — Escrow for x402 Payments on Stellar",
    description:
      "Dispute-aware escrow for x402 payments. Built on Stellar and powered by Soroban.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
