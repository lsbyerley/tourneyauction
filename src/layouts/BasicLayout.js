import { useUser } from '@auth0/nextjs-auth0';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BasicLayout = ({ children }) => {
  const { user, error, isLoading } = useUser();

  console.log('LOG: from UserProvider BasicLayout', user, error, isLoading);

  return (
    <div id='layout' className='flex flex-col min-h-screen'>
      <Header user={user} />
      <div className='flex-1 px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default BasicLayout;
