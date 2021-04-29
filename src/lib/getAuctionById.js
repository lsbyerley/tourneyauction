import graphCMSClient, { gql } from '@/lib/graphCMSClient';
import { AuctionFragment } from '@/queries/auctions';

export const AuctionByIdQuery = gql`
  query AuctionById($id: ID!) {
    auction(where: { id: $id }) {
      ...AuctionFragment
    }
  }
  ${AuctionFragment}
`;

async function getAuctionById({ id }) {
  const { auction } = await graphCMSClient.request(AuctionByIdQuery, {
    id,
  });

  return {
    auction,
  };
}

export default getAuctionById;
