import Head from 'next/head';
import auth0 from '@/lib/auth0';
import BasicLayout from '@/layouts/BasicLayout';
// import { useUser } from '@auth0/nextjs-auth0';

export async function getServerSideProps({ req, res }) {
  // Here you can check authentication status directly before rendering the page,
  // however the page would be a serverless function, which is more expensive and
  // slower than a static page with client side authentication
  const session = await auth0.getSession(req, res);

  if (!session || !session.user) {
    res.writeHead(302, {
      Location: '/api/auth/login',
    });
    res.end();
    return;
  }

  const resp = await fetch('https://frank-tiger-25.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      query: `
        {
          users {
            id
            name
          }
        }
      `,
    }),
  });

  const { data } = await resp.json();
  console.log('LOG: data about', data);
  return { props: { users: data?.users || null, user: session.user } };
  // return { props: { user: session.user } };
}

export default function About({ users, user }) {
  // const { user: testuser, error, isLoading } = useUser();

  console.log('LOG: about user from props', users, user);
  // console.log('LOG: about testuser from hook', testuser);

  return (
    <div>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>The About Page</p>
        <p>{JSON.stringify(user)}</p>
      </main>
    </div>
  );
}

About.layoutProps = {
  meta: {
    title: 'About',
  },
  Layout: BasicLayout,
};
