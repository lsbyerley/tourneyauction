import graphCMSMutationClient from '@/lib/graphCMSMutationClient.js';
import { CreateAuctionBidQuery, PublishAuctionBidQuery } from '@/queries/bids';

export default async (req, res) => {
  try {
    const { createBid } = await graphCMSMutationClient.request(
      CreateAuctionBidQuery,
      {
        data: req.body,
      }
    );

    const { publishedBid } = await graphCMSMutationClient.request(
      PublishAuctionBidQuery,
      {
        id: createBid.id,
      }
    );

    res.status(201).json({ bid: publishedBid });
  } catch (error) {
    console.log('LOG: error submitting bid', error);
    res.status(500).json({
      status: 500,
      message: 'There was a problem submitting your bid!',
    });
  }
};
