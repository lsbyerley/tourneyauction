import { useGetUser } from '@/lib/user';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Layout = ({ children }) => {
  const { profile, loading } = useGetUser();

  console.log('LOG: layout profile', profile);

  return (
    <div id='layout'>
      <Header user={profile} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
