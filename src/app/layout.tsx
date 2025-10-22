import './globals.css';
import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import SideNavBar from '@/components/root/sidebar';
import Main from '@/components/root/main';
import Footer from '@/components/root/footer';
import { Bounce, ToastContainer } from 'react-toastify';

// Load Google fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// ✅ Proper Metadata setup for title and favicon
export const metadata: Metadata = {
  title: {
    default: 'UTE-IC Portfolio',
    template: '%s | UTE-IC',
  },
  description: "Tunmise Falodun's Portfolio",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      {/* ✅ No manual <head> tag needed here */}
      <body
        className={` bg-background text-foreground ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SideNavBar />
        <div className='lg:ml-64'>
          <Main>{children}</Main>
          <Footer />
        </div>
        <ToastContainer
          position='top-center'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
          transition={Bounce}
        />
      </body>
    </html>
  );
}
