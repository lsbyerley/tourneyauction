import graphCMSClient, { gql } from '@/lib/graphCMSClient';

export const BidsByAuctionIdQuery = gql`
  query BidsByAuctionId($id: ID!) {
    bids(where: { auction: { id: $id } }) {
      amount
      id
      player {
        id
        name
      }
    }
  }
`;

async function getBidsByAuctionId({ id }) {
  const { auction } = await graphCMSClient.request(BidsByAuctionIdQuery, {
    id,
  });

  return {
    auction,
  };
}

export default getBidsByAuctionId;
