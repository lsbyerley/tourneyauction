import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
import fetch from 'isomorphic-fetch';
import players from './2021usopen.mjs';

const upsertPlayers = async ({ playerName, auctionId, sportId }) => {
  try {
    // CREATE THE PLAYER
    const createRes = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_URL, {
      headers: {
        Authorization: `Bearer ${process.env.GRAPHCMS_MUTATION_TOKEN}`,
        'content-type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        query: `
        mutation CreatePlayer {
          createPlayer(
            data: {
              auction: {connect: {id: "${auctionId}"}}, 
              sport: {connect: {id: "${sportId}"}}, 
              name: "${playerName}", 
            }
          ) {
            id
            name
          }
        }
      `,
      }),
    });

    const createData = await createRes.json();
    const playerId =
      createData?.data.createPlayer.id || 'created player not found';

    // PUBLISH THE PLAYER
    const publishRes = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_URL, {
      headers: {
        Authorization: `Bearer ${process.env.GRAPHCMS_MUTATION_TOKEN}`,
        'content-type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        query: `
        mutation PublishPlayer {
          publishPlayer(where: { id: "${playerId}" }) {
            id
            name
          }
        }
      `,
      }),
    });

    const publishData = await publishRes.json();
    const publishedPlayer =
      publishData?.data?.publishPlayer || 'publish player not found';
    return publishedPlayer;
  } catch (err) {
    console.error('LOG: player upsert error', err);
    return err;
  }
};

const go = async () => {
  console.log('LOG: creating player pool...');

  try {
    const playerNames = players;
    const auctionId = 'ckpjwix1c4kiz0b85soqy5y9d';
    const sportId = 'cknjqgv8wo8ey0c86o4wf9umd';

    const promises = playerNames.map((p) => {
      return upsertPlayers({ playerName: p, auctionId, sportId });
    });

    const settledPromises = await Promise.allSettled(promises);
    console.log('LOG: created!', settledPromises);
  } catch (err) {
    console.error('LOG: error in go', err);
  }
};

// go();
