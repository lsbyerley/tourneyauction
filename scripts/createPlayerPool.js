import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
import fetch from 'isomorphic-fetch';

const upsertPlayers = async () => {
  const playerName = '';
  const auctionId = '';
  const sportId = '';

  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_URL, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_MUTATION_TOKEN}`,
      'content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      mutation: `{
          createPlayer(
            data: {
              auction: {connect: {id: ${auctionId}}}, 
              sport: {connect: {id: ${sportId}}}, 
              name: ${playerName}, 
            }
          ) {
            name
          }
        }`,
    }),
  });
  const data = await res.json();
  return data;
};

const go = async () => {
  console.log('LOG: creating player pool...');
  console.log('LOG: TODO create player pool');
  console.log('LOG: created!');
};

go();
