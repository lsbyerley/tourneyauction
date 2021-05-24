import { gql, GraphQLClient } from 'graphql-request';

export default new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_API, {
  headers: {
    ...(process.env.NEXT_PUBLIC_HASURA_TOKEN && {
      'Content-type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HASURA_TOKEN}`,
    }),
  },
});

export { gql };
