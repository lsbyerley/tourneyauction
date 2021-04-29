import { gql } from 'graphql-request';

export const PlayersBySportQuery = gql`
  query PlayersBySport($sport: String, $league: String) {
    players(where: { sport: { name: $sport, league: $league } }) {
      id
      name
    }
  }
`;
