import { Geist, Geist_Mono, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/SessionProvider";

const geistSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const geistMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata = {
  title: "PACE Platform",
  description: "Collaborative education platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
