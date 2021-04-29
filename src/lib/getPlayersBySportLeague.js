import graphCMSClient, { gql } from '@/lib/graphCMSClient';

export const PlayersBySportLeagueQuery = gql`
  query PlayersBySportLeague($sport: String, $league: String) {
    players(where: { sport: { name: $sport, league: $league } }) {
      id
      name
    }
  }
`;

async function getPlayersBySportLeagueQuery({ sport, league }) {
  const { players } = await graphCMSClient.request(PlayersBySportLeagueQuery, {
    sport,
    league,
  });

  return {
    players,
  };
}

export default getPlayersBySportLeagueQuery;
