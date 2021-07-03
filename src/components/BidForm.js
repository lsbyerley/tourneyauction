import { BidsByAuctionId } from '@/queries/bids';
import { mutate } from 'swr';
import { useForm } from 'react-hook-form';
import { differenceInMinutes } from 'date-fns';
import { inRange } from 'lodash';

const BidForm = ({ user, auction, player, playerHighestBid }) => {
  const { handleSubmit, errors, register } = useForm();

  const onSubmit = async (formData, e) => {
    const auctionTimeLeft = differenceInMinutes(Date.now(), new Date(auction.endDate));

    try {
      mutate(
        [BidsByAuctionId, auction.id],
        async ({ bids }) => {
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
              bids: [...bids, { ...bid }],
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
      e.target.reset(); // reset the form value
    } catch (error) {
      alert('ERROR SUBMITTING BID!', error);
    }
  };

  const updateAuctionEndDate = async () => {
    console.log('LOG: add 3 minutes to auction end date');
  };

  console.log('LOG: BidForm', playerHighestBid, errors);

  const minBid = playerHighestBid + 0.25;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        step={0.25}
        min={minBid}
        placeholder={minBid}
        type="number"
        name="amount"
        ref={register({ min: minBid })}
        className="w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400"
      ></input>
      {errors.amount && <p className="mt-2 text-sm text-red-700">Bid must be greater than ${playerHighestBid}</p>}
      <button
        className="inline-flex items-center px-3 py-2 mt-2 text-sm font-medium leading-4 text-blue-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        type="submit"
      >
        Place Bid
      </button>
    </form>
  );
};

export default BidForm;
