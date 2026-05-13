import SideNavBar from '@/components/root/sidebar';
import Main from '@/components/root/main';
import Footer from '@/components/root/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideNavBar />
      <div className='lg:ml-64'>
        <Main>{children}</Main>
        <Footer />
      </div>
    </>
  );
}
