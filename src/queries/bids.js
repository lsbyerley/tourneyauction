import { gql } from 'graphql-request';

export const CreateAuctionBidQuery = gql`
  mutation CreateBid($data: BidCreateInput!) {
    createBid(data: $data) {
      stage
      amount
      userId
      auction {
        id
        name
      }
      player {
        id
        name
      }
    }
  }
`;

export const PublishAuctionBidQuery = gql`
  mutation PublishAuctionBid($id: ID!) {
    publishedBid: publishBid(where: { id: $id }) {
      id
      amount
      userId
      auction {
        id
      }
    }
  }
`;
