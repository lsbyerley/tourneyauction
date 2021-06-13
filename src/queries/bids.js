import { gql } from 'graphql-request';

export const CreateAuctionBidQuery = gql`
  mutation CreateBid($data: BidCreateInput!) {
    createBid(data: $data) {
      id
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
        name
      }
      player {
        id
        name
      }
    }
  }
`;

// TWO QUERIES FOR GETTING BIDS BY AUCTION

// this one will work with pagination
export const AuctionBidsQuery = gql`
  query AuctionBidsQuery($auctionId: ID!) {
    bids: bidsConnection(where: { auction: { id: $auctionId } }) {
      aggregate {
        count
      }
      edges {
        node {
          id
          userId
          amount
          player {
            name
            id
          }
        }
      }
    }
  }
`;

// this one will return all bids without being able to paginate
export const BidsByAuctionId = gql`
  query BidsByAuctionId($auctionId: ID!) {
    bids(where: { auction: { id: $auctionId } }) {
      id
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
