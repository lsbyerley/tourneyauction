import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import BasicLayout from '@/layouts/BasicLayout';
import getAuctionById from '@/lib/getAuctionById';
import getPlayersByAuctionSport from '@/lib/getPlayersByAuctionSport';
import getUsers from '@/lib/getUsers';
import { BidsByAuctionId } from '@/queries/bids';
import useSWR from 'swr';
import graphCMSClient from '@/lib/graphCMSClient';
import BidForm from '@/components/BidForm';
import { useUser } from '@auth0/nextjs-auth0';
import { format } from 'date-fns';
import Countdown from 'react-countdown';

const Auction = ({ auction, players, users }) => {
  const { user, error: userError, isLoading } = useUser();
  const [auctionOver, setAuctionOver] = useState(false);

  const { data, error } = useSWR([BidsByAuctionId, auction.id], (query, auctionId) => {
    return graphCMSClient.request(query, { auctionId });
  });

  const getPlayerHighestBid = (id) => {
    let highestBid = {};
    const bids = data?.bids || [];
    if (bids && bids.length) {
      const playerBids = bids.filter((b) => b?.player?.id === id).sort((a, b) => b?.amount - a?.amount);
      highestBid = playerBids[0] || {};
    }
    return highestBid;
  };

  const getHighestBidderText = (user, bid) => {
    if (!auctionOver && user && bid) {
      const userId = user.sub;
      return userId === bid?.userId ? 'You are winning!' : '';
    }
    return '';
  };

  const getWinningBidderName = (user, highestBid, users) => {
    if (auctionOver && highestBid && users) {
      const winningUser = users.find((u) => u.id === highestBid?.userId);
      return winningUser && winningUser.name ? `winner ${winningUser.name}` : '';
    }
    return null;
  };

  const AuctionOverText = () => <span className="text-red-500">Auction Over!</span>;

  const auctionTicker = (props) => {
    if (props.completed && !auctionOver) {
      setAuctionOver(true);
    }
  };

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setAuctionOver(true);
      return <AuctionOverText />;
    } else {
      // Render a countdown
      return (
        <span className="text-green-500">
          {days > 0 && <>{days} days, </>}
          {hours > 0 && <>{hours} hrs, </>}
          {minutes > 0 && <>{minutes} min, </>}
          {seconds > 0 && <>{seconds} sec</>}
        </span>
      );
    }
  };

  return (
    <div>
      <Head>
        <title>{auction.name} | Golf Tourney Auction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!auction && <p>auction not found!</p>}
        {auction && (
          <div className="pb-5 mb-8 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
            <h3 className="text-lg font-medium leading-6 text-gray-900">{auction.name}</h3>
            <div className="flex mt-3 sm:mt-0 sm:ml-4">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 mr-4">
                {auction.sport.name}
              </span>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">{auction.sport.league}</span>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Auction Stats</h3>
          <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">
            <div className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Bids</dt>
              <dd className="mt-1 text-xl font-semibold text-gray-900">{data?.bids?.length || '0'}</dd>
            </div>
            {/* <div className='px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6'>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                {'Start Date'}
              </dt>
              <dd className='mt-1 text-xl font-semibold text-gray-500'>
                {format(new Date(auction.startDate), 'LLL d, h:mm aaa')}
              </dd>
            </div> */}
            <div className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{'End Date'}</dt>
              <dd className="mt-1 text-xl font-semibold text-gray-500">{format(new Date(auction.endDate), 'LLL d, h:mm aaa')}</dd>
            </div>
            <div className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{'Time Left'}</dt>
              <dd className="mt-1 text-xl font-semibold text-gray-900">
                <Countdown date={auction.endDate} renderer={countdownRenderer} onTick={auctionTicker} />
              </dd>
            </div>
          </dl>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Player List</h3>
          {!players.length && <p className="mt-4">No Players have been added to this auction yet.</p>}
          {players.length > 0 && (
            <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2">
              {players.map((player) => {
                const playerHighestBid = getPlayerHighestBid(player.id);
                return (
                  <div key={player.id} className="relative flex items-center px-3 py-2 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm">
                    <div className="flex-shrink-0 w-10 h-10">
                      {player.imageUrl && <Image className="rounded-full" src={player.imageUrl} alt={player.name} layout="fill" objectFit="contain" />}
                      {!player.imageUrl && (
                        <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 20">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {/*<span className='absolute inset-0' aria-hidden='true' />*/}
                      <p className="font-medium text-gray-900 text-md">{player.name}</p>
                      <p className="text-sm text-green-500 truncate">
                        {getHighestBidderText(user, playerHighestBid)}
                        {getWinningBidderName(user, playerHighestBid, users)}
                      </p>
                    </div>
                    <div className="flex-1 text-center">
                      {playerHighestBid?.amount && (
                        <>
                          <p className="">Winning Bid</p>
                          <p className="text-green-700">${playerHighestBid?.amount}</p>
                        </>
                      )}
                      {!playerHighestBid?.amount && <p className="text-sm text-gray-400">No Bids!</p>}
                    </div>
                    <div className="w-32 text-center">
                      {!auctionOver && user && <BidForm user={user} auction={auction} player={player} playerHighestBid={playerHighestBid?.amount || 0} />}
                      {!auctionOver && !user && (
                        <p>
                          <Link href="/api/auth/login">
                            <a className="text-blue-500">Login</a>
                          </Link>{' '}
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

/* export async function getStaticProps(context) {
  const { id } = context.params;
  const { users } = await getUsers();
  const { auction } = await getAuctionById({ id });
  const { players } = await getPlayersByAuctionSport({
    auction: auction.id,
    sport: auction.sport.id,
  });

  return {
    props: {
      auction,
      players,
      users,
    },
    revalidate: 10,
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
} */

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { users } = await getUsers();
  const { auction } = await getAuctionById({ id });
  const { players } = await getPlayersByAuctionSport({
    auction: auction.id,
    sport: auction.sport.id,
  });

  return {
    props: {
      auction,
      players,
      users,
    },
  };
}

Auction.layoutProps = {
  meta: {
    title: 'Auction',
  },
  Layout: BasicLayout,
};

export default Auction;
