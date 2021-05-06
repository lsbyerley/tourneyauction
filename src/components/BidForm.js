import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import AuctionBidsQuery from '@/queries/bids';
import { mutate } from 'swr';
import { useForm } from 'react-hook-form';

const BidForm = ({ auction, player }) => {
  const { handleSubmit, formMethods } = useForm();

  const onSubmit = async (data) => {
    console.log('LOG: here submitting bid', data);
    /* mutate(
      [AuctionBidsQuery, auction.id],
      async ({ bids: { aggregate, edges } }) => {
        console.log('LOG: before createAuctionBid', aggregate, edges);
        try {
          const { bid } = await fetch('/api/graphcms/createAuctionBid', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              auction: { connect: { id: auction.id } },
              player: { connect: { id: player.id } },
              ...data,
            }),
          }).then((res) => res.json());

          console.log('LOG: after createAuctionBid', bid);

          return {
            // bid,
            bids: {
              aggregate: { count: ++aggregate.count },
              edges: [...edges, { node: bid }],
            },
          };
        } catch (error) {
          console.log(error);
        }
      },
      false
    ); */
  };

  return (
    <Form
      className='space-y-4'
      methods={formMethods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Input field='amount' type='number'></Form.Input>
      <Button type='submit'>Submit</Button>
    </Form>
  );
};

export default BidForm;
