import hasuraClient, { gql } from '@/lib/hasuraClient';

export const GetUsersQuery = gql`
  query AllUsers {
    users {
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
