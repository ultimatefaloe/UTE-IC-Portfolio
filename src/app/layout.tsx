import SideNavBar from "@/components/root/sidebar";
import "./globals.css"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Main from "@/components/root/main";
import Footer from "@/components/root/footer";
import { ThemeProvider } from "@/_context/themeContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
          <div className="lg:ml-64">
            <Main>{children}</Main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
