import Navbar from '@/components/root/navbar';
import Footer from '@/components/root/footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
