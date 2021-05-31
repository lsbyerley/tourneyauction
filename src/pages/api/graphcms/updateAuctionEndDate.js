import graphCMSMutationClient from '@/lib/graphCMSMutationClient.js';
import {
  UpdateAuctionEndDateQuery,
  PublishAuctionQuery,
} from '@/queries/auctions';

export default async (req, res) => {
  // TODO: Needs testing, hasn't been used yet
  console.log('LOG: updateAuctionEndDate', req);
  try {
    const { updatedAuction } = await graphCMSMutationClient.request(
      UpdateAuctionEndDateQuery,
      {
        data: req.body,
      }
    );

    const { publishedAuction } = await graphCMSMutationClient.request(
      PublishAuctionQuery,
      {
        id: updatedAuction.id,
      }
    );

    res.status(201).json({ auction: publishedAuction });
  } catch (error) {
    console.log('LOG: error updating auction', error);
    res.status(500).json({
      status: 500,
      message: 'There was a problem updating the auction end date',
    });
  }
};
