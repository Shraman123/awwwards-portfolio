import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Background3D from "@/components/Background3D";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Awwwards Inspired Portfolio",
  description: "Ultra-premium interactive Next.js portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased selection:bg-[#afc6ff] selection:text-[#002d6d]`}
      >
        <SmoothScroll>
          <CustomCursor />
          <Background3D />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
