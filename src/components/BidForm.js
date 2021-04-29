import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import CreateAuctionBidQuery from '@/queries/bids';
import { mutate } from 'swr';
import { useForm } from 'react-hook-form';

const BidForm = ({ auction, player }) => {
  const { handleSubmit, formMethods } = useForm();

  const onSubmit = async (data) => {
    console.log('LOG: here submitting bid', data);
    mutate(
      [CreateAuctionBidQuery, data],
      async (/*{ reviews: { aggregate, edges } }*/) => {
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

          return {
            bid,
            /* reviews: {
              aggregate: { count: ++aggregate.count },
              edges: [...edges, { node: review }],
            }, */
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
