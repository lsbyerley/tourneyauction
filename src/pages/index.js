import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GraphQLClient } from 'graphql-request';
import Layout from '@/components/Layout';
import { useUser } from '@auth0/nextjs-auth0';

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT);

export async function getStaticProps() {
  const { destinations } = await graphcms.request(
    `
    query Destinations() {
      destinations {
        id
        name
        description
        image {
          url
          width
          height
        }
      }
    }
    `
  );

  return {
    props: {
      destinations,
    },
  };
}

export default function Home({ destinations }) {
  const { user, error, isLoading } = useUser();

  console.log('LOG: from UserProvider in index.js', user, error, isLoading);

  return (
    <div>
      <Head>
        <title>GraphCMS Golf Starter</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <main>
          <h1>Destinations</h1>

          <ul>
            <li>
              <Link href='/'>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href='/about'>
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href='/login'>
                <a>Login</a>
              </Link>
            </li>
          </ul>

          {destinations.map((d) => {
            // console.log('LOG: d', d);
            return (
              <div key={d.id}>
                {d.image && (
                  <div className='w-40'>
                    <Image
                      src={d.image.url}
                      width={d.image.width}
                      height={d.image.height}
                    />
                  </div>
                )}
                <p>{d.name}</p>
                <p>{d.description}</p>
              </div>
            );
          })}
        </main>
      </Layout>
    </div>
  );
}
