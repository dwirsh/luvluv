import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Love Meter GG | Gaming-Side Matchmaker",
  description: "Cek kecocokan kamu dengan gebetan dalam gaya gaming futuristik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className={`${outfit.className} min-h-full flex flex-col bg-background text-foreground relative overflow-hidden`}>
        {/* Decorative Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-40">
          <div className="absolute top-10 left-[10%] text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🌸</div>
          <div className="absolute top-40 right-[15%] text-3xl animate-pulse">✨</div>
          <div className="absolute bottom-20 left-[20%] text-5xl animate-bounce" style={{ animationDuration: '4s' }}>💖</div>
          <div className="absolute bottom-40 right-[10%] text-4xl animate-pulse">🍭</div>
          <div className="absolute top-1/2 left-[-5%] text-6xl opacity-10">🎀</div>
          <div className="absolute top-1/4 right-[-5%] text-6xl opacity-10">🌈</div>
        </div>
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
