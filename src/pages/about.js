import Head from 'next/head';
import auth0 from '@/lib/auth0';

export async function getServerSideProps({ req, res }) {
  // Here you can check authentication status directly before rendering the page,
  // however the page would be a serverless function, which is more expensive and
  // slower than a static page with client side authentication
  const session = await auth0.getSession(req, res);

  if (!session || !session.user) {
    res.writeHead(302, {
      Location: '/api/login',
    });
    res.end();
    return;
  }

  /*const resp = await fetch('https://hasura-fit.herokuapp.com/v1/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      query: `
        {
          sessions {
            created_at
            workout(stage: PUBLISHED, where: {}) {
              title
            }
          }
        }
      `,
    }),
  });

  const { data } = await resp.json();
  return { props: { sessions: data.sessions, user: session.user } }; */
  return { props: { user: session.user } };
}

export default function About({ user }) {
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <p>{JSON.stringify(user)}</p>
      </main>
    </div>
  );
}
