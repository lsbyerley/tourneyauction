import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import { AuctionBidsQuery } from '@/queries/bids';
import { mutate } from 'swr';
import { useForm } from 'react-hook-form';

const BidForm = ({ auction, player }) => {
  const { handleSubmit, ...formMethods } = useForm();

  const onSubmit = async (formData) => {
    mutate(
      [AuctionBidsQuery, auction.id],
      async ({ bids: { aggregate, edges } }) => {
        const bidAmount = Number(formData.amount);

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
              userId: 'testing1234',
            }),
          }).then((res) => res.json());

          return {
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
    );
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
