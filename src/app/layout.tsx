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
  title: "撲克筆記本 | Poker Notebook",
  description: "專業的撲克遊戲記錄與分析工具，幫助您追蹤收益並改進策略。",
  keywords: ["撲克", "德州撲克", "紀錄", "分析", "策略", "poker", "notebook"],
  authors: [{ name: "Lee Tung" }],
  openGraph: {
    title: "撲克筆記本 | Poker Notebook",
    description: "專業的撲克遊戲記錄與分析工具",
    type: "website",
    locale: "zh_TW",
  },
  icons: [{
    rel: 'icon',
    url: '/icon.svg',
    type: 'image/svg+xml',
  }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
