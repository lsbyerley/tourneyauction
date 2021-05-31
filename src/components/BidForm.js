import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import { AuctionBidsQuery } from '@/queries/bids';
import { mutate } from 'swr';
import { useForm } from 'react-hook-form';
import { differenceInMinutes } from 'date-fns';
import { inRange } from 'lodash';

const BidForm = ({ user, auction, player, playerHighestBid }) => {
  const { handleSubmit, ...formMethods } = useForm();

  const onSubmit = async (formData) => {
    const auctionTimeLeft = differenceInMinutes(Date.now(), new Date(auction.endDate));

    try {
      mutate(
        [AuctionBidsQuery, auction.id],
        async ({ bids: { aggregate, edges } }) => {
          const bidAmount = Number(formData.amount);
          const userId = user.sub;

          try {
            const { bid } = await fetch('/api/graphcms/createAuctionBid', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                auction: { connect: { id: auction.id } },
                player: { connect: { id: player.id } },
                amount: bidAmount,
                userId: userId,
              }),
            }).then((res) => res.json());

            if (inRange(auctionTimeLeft, -3, 0)) {
              updateAuctionEndDate();
            }

            return {
              bids: {
                aggregate: { count: ++aggregate.count },
                edges: [...edges, { node: bid }],
              },
            };
          } catch (error) {
            console.error('LOG: bid submit failed', error);
            return {
              status: 'bid failed',
            };
          }
        },
        false
      );
    } catch (error) {
      alert('ERROR SUBMITTING BID! toast error', error);
    }
  };

  const updateAuctionEndDate = async () => {
    console.log('LOG: add 3 minutes to auction end date');
  }

  return (
    <Form
      className='space-y-4'
      methods={formMethods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Input
        field='amount'
        type='number'
        step='.25'
        placeholder={playerHighestBid + .25}
        playerHighestBid={playerHighestBid}
      ></Form.Input>
      <Button type='submit'>Place Bid</Button>
    </Form>
  );
};

export default BidForm;
