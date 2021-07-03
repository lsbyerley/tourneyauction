import graphCMSClient, { gql } from '@/lib/graphCMSClient';

export const PlayersByAuctionSport = gql`
  query PlayersByAuctionSport($auction: ID!, $sport: ID!) {
    players(orderBy: name_ASC, where: { auction: { id: $auction }, sport: { id: $sport } }) {
      id
      name
    }
  }
`;

async function getPlayersByAuctionSport({ auction, sport }) {
  const { players } = await graphCMSClient.request(PlayersByAuctionSport, {
    auction,
    sport,
  });

  return {
    players,
  };
}

export default getPlayersByAuctionSport;
