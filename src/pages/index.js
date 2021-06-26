import Head from 'next/head';
import BasicLayout from '@/layouts/BasicLayout';
import { PlusCircleIcon } from '@heroicons/react/solid';
import getAllAuctions from '@/lib/getAllAuctions';
import { format } from 'date-fns';

export async function getStaticProps() {
  const { auctions } = await getAllAuctions();
  return {
    props: { auctions },
    revalidate: 30
  };
}

const AuctionItem = ({ auction }) => {
  let imgSlug = auction.sport.league.toLowerCase().replace(' ', '');
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
              {auction.sport.league}
            </span>
          </div>
          <p className='mt-1 text-sm text-gray-500 truncate'>
            Start Date:{' '}
            {format(new Date(auction.startDate), 'LLL d h:mm aaa')}
          </p>
          <p className='mt-1 text-sm text-gray-500 truncate'>
            End Date:{' '}
            {format(new Date(auction.endDate), 'LLL d h:mm aaa')}
          </p>
        </div>
        <img
          className='flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full'
          src={`/${imgSlug}.png`}
          alt=''
        />
      </div>
      <div>
        <div className='flex -mt-px divide-x divide-gray-200'>
          <div className='flex flex-1 w-0'>
            <a
              href={`/auction/${auction.id}`}
              className='relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500'
            >
              <PlusCircleIcon
                className='w-5 h-5 text-gray-400'
                aria-hidden='true'
              />
              <span className='ml-3'>View</span>
            </a>
          </div>
          {/* <div className='flex flex-1 w-0 -ml-px'>
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
          </div> */}
        </div>
      </div>
    </li>
  );
}

export default function Home({ auctions }) {

  const liveAuctions = auctions.filter((a) => {
    console.log('LOG: endate', a.endDate, new Date(), a.endDate < new Date().toISOString())
    return a.endDate > new Date().toISOString();
  });
  const completedAuctions = auctions.filter((a) => {
    return a.endDate < new Date().toISOString();
  })

  return (
    <div>
      <Head>
        <title>Home Golf Auction</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
      <div className="pb-5 mb-8 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-green-500">Live Now</h3>
      </div>
        {liveAuctions.length === 0 && <p className="text-gray-600">There are no live auctions right now!</p>}
        <ul className='grid grid-cols-1 gap-6 mb-16 sm:grid-cols-2'>
          {liveAuctions.map((auction) => {
            return (
              <AuctionItem auction={auction} />
            );
          })}
        </ul>
        <div className="pb-5 mb-8 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-800">Completed</h3>
        </div>
        {completedAuctions.length === 0 && <p className="text-gray-600">There are no completed auctions yet!</p>}
        <ul className='grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2'>
          {completedAuctions.map((auction) => {
            return (
              <AuctionItem auction={auction} />
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
