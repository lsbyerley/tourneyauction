import graphCMSClient, { gql } from '@/lib/graphCMSClient';
import { AuctionFragment } from '@/queries/auctions';

export const AllAuctionsQuery = gql`
  query AllAuctionsQuery() {
    auctions() {
      ...AuctionFragment
    }
  }
  ${AuctionFragment}
`;

async function getAllAuctions() {
  const { auctions } = await graphCMSClient.request(AllAuctionsQuery);

  return {
    auctions,
  };
}

export default getAllAuctions;
