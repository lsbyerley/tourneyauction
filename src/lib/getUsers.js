import hasuraClient, { gql } from '@/lib/hasuraClient';
// import { user } from '@/queries/user';

export const GetUsersQuery = gql`
  query GetUsers() {
    users() {
      id
      name
      email
    }
  }
`;

async function getUsers() {
  const { users } = await hasuraClient.request(GetUsersQuery);

  return {
    users,
  };
}

export default getUsers;
