import { gql } from 'graphql-request';

export const AuctionFragment = gql`
  fragment AuctionFragment on Auction {
    id
    name
    sport {
      id
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

export const UpdateAuctionEndDateQuery = gql`
  mutation UpdateAuctionEndDate($id: ID!, $endDate: DateTime!) {
    updatedAuction: updateAuctionEndDate(data: { startDate: $endDate }, where: { id: $id }) {
      id
      startDate
      endDate
      name
    }
  }
`;

export const PublishAuctionQuery = gql`
  mutation PublishAuction($id: ID!) {
    publishedAuction: publishAuction(where: { id: $id }) {
      ...AuctionData
    }
  }
  ${AuctionFragment}
`;
