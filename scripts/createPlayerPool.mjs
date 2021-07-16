import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
import fetch from 'isomorphic-fetch';
import playerList, { fetchPlayerList } from './2021openchamp.mjs';

const createPlayerMutation = async ({ auctionId, sportId, playerName }) => {
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

  const { data, errors } = await createRes.json();
  if (errors) {
    console.log('LOG: createError', errors);
  }
  const playerId = data?.createPlayer?.id || null;
  return playerId;
};

const publishPlayerMutation = async ({ playerId }) => {
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

  const { data, errors } = await publishRes.json();
  if (errors) {
    console.log('LOG: publishError', errors);
  }
  const publishedPlayer = data?.publishPlayer || -1;
  return publishedPlayer;
};

const upsertPlayer = async ({ playerName, auctionId, sportId }) => {
  try {
    const createdPlayerId = await createPlayerMutation({ auctionId, sportId, playerName });
    const publishedPlayer = await publishPlayerMutation({ playerId: createdPlayerId });
    return publishedPlayer;
  } catch (err) {
    console.error('LOG: player upsert error', err);
  }
};

const go = async () => {
  console.log('LOG: creating player pool...');

  let players;
  if (!playerList || playerList.length === 0) {
    players = await fetchPlayerList();
  } else {
    players = playerList;
  }

  try {
    const playerNames = players;
    const auctionId = 'ckqntktk8uut00d82lp6p3cwg';
    const sportId = 'cknjqgv8wo8ey0c86o4wf9umd';

    // TODO: Throttle this to about 5 mutation requests per second
    const promises = playerNames.map((p) => {
      return new Promise((resolve) => resolve(`LOG: test run, uncomment next line ${p} - ${auctionId} - ${sportId}`));
      // return upsertPlayer({ playerName: p, auctionId, sportId });
    });

    const settledPromises = await Promise.allSettled(promises);
    console.log('LOG: created!', settledPromises);
  } catch (err) {
    console.error('LOG: error in go', err);
  }
};

go();
