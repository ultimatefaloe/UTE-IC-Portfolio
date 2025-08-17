import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideNavBar from "./UI/Sidenavbar";
import Footer from "./UI/Footer";
import Main from "./UI/Main";
import { ThemeProvider } from "./Context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "UTE-IC Portfolio",
  description: "Tunmise Falodun's Portfolio",
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
        <ThemeProvider>
          <SideNavBar />
            <Main>
              {children}
          <Footer />

            </Main>
        </ThemeProvider>
      </body>
    </html>
  );
}
