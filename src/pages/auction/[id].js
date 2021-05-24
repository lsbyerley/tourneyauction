import Head from 'next/head';
import BasicLayout from '@/layouts/BasicLayout';
import getAllAuctions from '@/lib/getAllAuctions';
import getAuctionById from '@/lib/getAuctionById';
import getPlayersBySportLeague from '@/lib/getPlayersBySportLeague';
import getUsers from '@/lib/getUsers';
import { AuctionBidsQuery } from '@/queries/bids';
import useSWR from 'swr';
import graphCMSClient from '@/lib/graphCMSClient';
import BidForm from '@/components/BidForm';
import { useUser } from '@auth0/nextjs-auth0';
import { format } from 'date-fns';
import Countdown from 'react-countdown';
import auth0 from '@/lib/auth0';

const Auction = ({ auction, players }) => {
  const { user, error: userError, isLoading } = useUser();

  const { data, error } = useSWR(
    [AuctionBidsQuery, auction.id],
    (query, auctionId) => {
      return graphCMSClient.request(query, { auctionId });
    }
  );

  const getPlayerHighestBid = (id) => {
    let highestBid = {};
    const bids = data?.bids?.edges || [];
    if (bids && bids.length) {
      const playerBids = bids
        .filter((b) => b?.node?.player?.id === id)
        .sort((a, b) => b?.node?.amount - a?.node?.amount);
      highestBid = playerBids[0] || {};
    }
    return highestBid;
  };

  const getHighestBidderText = (user, bid) => {
    console.log('LOG: user highest', user, bid);
    if (user && bid) {
      const userId = user.sub;
      return userId === bid?.node?.userId ? 'You are winning!' : '';
    }
    return '';
  };

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

        <div className='mb-8'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Auction Stats
          </h3>
          <dl className='grid grid-cols-1 gap-5 mt-5 sm:grid-cols-4'>
            <div className='px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6'>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                Total Bids
              </dt>
              <dd className='mt-1 text-2xl font-semibold text-gray-900'>
                {data?.bids?.aggregate?.count || '0'}
              </dd>
            </div>
            <div className='px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6'>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                {'Start Date'}
              </dt>
              <dd className='mt-1 text-2xl font-semibold text-gray-900'>
                {format(new Date(auction.startDate), 'LLL d, h:m aaa')}
              </dd>
            </div>
            <div className='px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6'>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                {'End Date'}
              </dt>
              <dd className='mt-1 text-2xl font-semibold text-gray-900'>
                {format(new Date(auction.endDate), 'LLL d, h:m aaa')}
              </dd>
            </div>
            <div className='px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6'>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                {'Time Left'}
              </dt>
              <dd className='mt-1 text-2xl font-semibold text-gray-900'>
                <Countdown date={auction.endDate} />
              </dd>
            </div>
          </dl>
        </div>

        <div className='mb-8'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Player List
          </h3>
          {!players && <p>No Players!</p>}
          {players.length && (
            <div className='grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2'>
              {players.map((player) => {
                const playerHighestBid = getPlayerHighestBid(player.id);
                return (
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
                      <p className='font-medium text-gray-900 text-md'>
                        {player.name}
                      </p>
                      <p className='text-sm text-green-500 truncate'>
                        {getHighestBidderText(user, playerHighestBid)}
                      </p>
                    </div>
                    <div className='flex-1 text-center'>
                      <p className=''>Winning Bid</p>
                      <p className='text-green-700'>
                        ${playerHighestBid?.node?.amount || 0}
                      </p>
                    </div>
                    <div className='w-32 text-center'>
                      {user && (
                        <BidForm
                          user={user}
                          auction={auction}
                          player={player}
                          playerHighestBid={playerHighestBid?.node?.amount || 0}
                        />
                      )}
                      {!user && (
                        <p>
                          <a className='text-blue-500' href='/api/auth/login'>
                            login
                          </a>{' '}
                          to bid
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
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

  // const session = await auth0.getSession(req);

  // console.log('LOG: session', session);

  
  // TODO: figure out hasura graphql client query error
  // const { users } = await getUsers();

  // console.log('LOG: users', users);

  return {
    props: {
      auction,
      players,
      // users,
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

/* export async function getServerSideProps({ req, res }) {
  return {
    props: {
      userInfo: {}
    },
  };
} */

export default Auction;
