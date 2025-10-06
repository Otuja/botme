import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bot Me",
  description: "A gemini ai chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
          <Navbar />

          {/* Sidebar (independent scroll) */}
          <div className="">
            <Sidebar />
          </div>

          {/* Main Chat Area (independent scroll) */}
          <div className="w-full overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
