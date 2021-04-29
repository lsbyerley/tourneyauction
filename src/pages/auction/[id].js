import Head from 'next/head';
import BasicLayout from '@/layouts/BasicLayout';
import getAllAuctions from '@/lib/getAllAuctions';
import getAuctionById from '@/lib/getAuctionById';
import getPlayersBySportLeague from '@/lib/getPlayersBySportLeague';
import getBidsByAuctionId, {
  BidsByAuctionIdQuery,
} from '@/lib/getBidsByAuctionId';
import useSWR from 'swr';
import graphCMSClient from '@/lib/graphCMSClient';
import BidForm from '@/components/BidForm';

const Auction = ({ auction, players }) => {
  console.log('LOG: auction', auction);

  // TODO: Get all bids by auction on the client side and map to players
  const { data, error } = useSWR(
    [BidsByAuctionIdQuery, auction.id],
    (query, id) => {
      // console.log('LOG: auction bids', query, id);
      return graphCMSClient.request(query, { id });
    }
  );

  console.log('BIDS!', data, error);

  return (
    <div>
      <Head>
        <title>{auction.name} | Golf Tourney Auction</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        {!auction && <p>auction not found!</p>}
        {auction && (
          <div className='pb-5 mb-8 border-b border-gray-200 sm:flex sm:items-center sm:justify-between'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              {auction.name}
            </h3>
            <div className='flex mt-3 sm:mt-0 sm:ml-4'>
              <button
                type='button'
                className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Join
              </button>
              <button
                type='button'
                className='inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Leave
              </button>
            </div>
          </div>
        )}

        <p>Total Bids: {data?.bids?.length || 'nobids'}</p>

        {!players && <p>No Players!</p>}
        {players.length && (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {players.map((player) => (
              <div
                key={player.id}
                className='relative flex items-center px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm'
              >
                <div className='flex-shrink-0'>
                  <img
                    className='w-10 h-10 rounded-full'
                    src={player.imageUrl}
                    alt=''
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  {/*<span className='absolute inset-0' aria-hidden='true' />*/}
                  <p className='text-sm font-medium text-gray-900'>
                    {player.name}
                  </p>
                  <p className='text-sm text-gray-500 truncate'>{player.id}</p>
                </div>
                <div>
                  <BidForm auction={auction} player={auction} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export async function getStaticProps(context) {
  const { id } = context.params;
  const { auction } = await getAuctionById({ id });
  const { players } = await getPlayersBySportLeague({
    sport: auction.sport.name,
    league: auction.sport.league,
  });

  return {
    props: {
      auction,
      players,
    },
  };
}

export async function getStaticPaths() {
  const { auctions } = await getAllAuctions();

  const paths = auctions.map((auction) => ({
    params: { id: auction.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

Auction.layoutProps = {
  meta: {
    title: 'Auction',
  },
  Layout: BasicLayout,
};

export default Auction;
