import { useUser } from '@auth0/nextjs-auth0';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BasicLayout = ({ children }) => {
  const { user, error, isLoading } = useUser();

  console.log('LOG: from UserProvider BasicLayout', user, error, isLoading);

  return (
    <div id='layout'>
      <Header user={user} />
      <div className='px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default BasicLayout;
