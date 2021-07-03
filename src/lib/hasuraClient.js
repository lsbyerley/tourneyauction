import { gql, GraphQLClient } from 'graphql-request';

export default new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_API, {
  headers: {
    ...(process.env.NEXT_HASURA_GRAPHQL_ADMIN_SECRET && {
      // 'x-hasura-role': 'public',
      'Content-type': 'application/json',
      'x-hasura-admin-secret': process.env.NEXT_HASURA_GRAPHQL_ADMIN_SECRET,
    }),
  },
});

export { gql };
