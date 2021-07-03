import { useState, useEffect, Fragment } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import ProgressBar from '@badrap/bar-of-progress';
import Head from 'next/head';
import Router from 'next/router';
import { Title } from '@/components/Title';
import '../styles/globals.css';

const progress = new ProgressBar({
  size: 2,
  color: '#22D3EE',
  className: 'bar-of-progress',
  delay: 100,
});

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start();
  progress.finish();
}

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', () => {
  progress.finish();
  window.scrollTo(0, 0);
});
Router.events.on('routeChangeError', progress.finish);

const MyApp = ({ Component, pageProps }) => {
  let [navIsOpen, setNavIsOpen] = useState(false);

  useEffect(() => {
    if (!navIsOpen) return;
    function handleRouteChange() {
      setNavIsOpen(false);
    }
    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [navIsOpen]);

  const Layout = Component.layoutProps?.Layout || Fragment;
  const layoutProps = Component.layoutProps?.Layout ? { layoutProps: Component.layoutProps, navIsOpen, setNavIsOpen } : {};

  const meta = Component.layoutProps?.meta || {};
  const description = meta.metaDescription || meta.description || 'Golf Tourney Auction';

  return (
    <>
      <Title suffix="Golf Tourney Auction">{meta.metaTitle || meta.title}</Title>
      <Head>
        <meta key="og:description" property="og:description" content={description} />
      </Head>
      <UserProvider>
        <Layout {...layoutProps}>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
};

export default MyApp;
