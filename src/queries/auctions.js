import { gql } from 'graphql-request';

export const AuctionFragment = gql`
  fragment AuctionFragment on Auction {
    id
    name
    sport {
      name
      league
    }
    startDate
    endDate
    __typename
  }
`;

export const AUCTION_IDS = gql`
  query AuctionIds {
    auctions {
      id
    }
  }
`;

export const AUCTION_BY_ID = gql`
  query AuctionById($id: ID) {
    auction(where: { id: $id }) {
      ...AuctionData
    }
  }
  ${AuctionFragment}
`;
