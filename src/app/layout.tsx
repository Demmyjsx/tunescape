import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SafariCompatScript from "./SafariCompatScript";


export const metadata: Metadata = {
  title: "Music Tune Player",
  description: "Listen to your favorite tunes with Music Tune Player for 30 seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <SafariCompatScript />
        {children}
      </body>
    </html>
  );
}
