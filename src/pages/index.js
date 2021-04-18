import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GraphQLClient } from 'graphql-request';
import BasicLayout from '@/layouts/BasicLayout';
import { UserAddIcon, MailIcon, PhoneIcon } from '@heroicons/react/solid';

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

  const { sports } = await graphcms.request(
    `
    query Sports() {
      sports {
        name
        league
      }
    }
    `
  );

  const { auctions } = await graphcms.request(
    `
    query Auctions() {
      auctions {
        id
        createdAt
        name
        sport
        startDate
        endDate
      }
    }
    `
  );

  return {
    props: {
      destinations,
      sports,
      auctions,
    },
  };
}

export default function Home({ destinations, sports, auctions }) {
  return (
    <div>
      <Head>
        <title>Home Golf Auction</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {auctions.map((auction) => {
            console.log('LOG: auction', auction);
            return (
              <li
                key={auction.id}
                className='col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow'
              >
                <div className='flex items-center justify-between w-full p-6 space-x-6'>
                  <div className='flex-1 truncate'>
                    <div className='flex items-center space-x-3'>
                      <h3 className='text-sm font-medium text-gray-900 truncate'>
                        {auction.name}
                      </h3>
                      <span className='flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full'>
                        {auction.sport}
                      </span>
                    </div>
                    <p className='mt-1 text-sm text-gray-500 truncate'>
                      {auction.startDate}
                    </p>
                  </div>
                  <img
                    className='flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full'
                    src={'insert user picture here'}
                    alt=''
                  />
                </div>
                <div>
                  <div className='flex -mt-px divide-x divide-gray-200'>
                    <div className='flex flex-1 w-0'>
                      <a
                        href='#'
                        className='relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500'
                      >
                        <MailIcon
                          className='w-5 h-5 text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='ml-3'>Join</span>
                      </a>
                    </div>
                    <div className='flex flex-1 w-0 -ml-px'>
                      <a
                        href='#'
                        className='relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500'
                      >
                        <PhoneIcon
                          className='w-5 h-5 text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='ml-3'>Entry Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

Home.layoutProps = {
  meta: {
    title: 'Home',
  },
  Layout: BasicLayout,
};
