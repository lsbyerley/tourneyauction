import { gql } from 'graphql-request';

export const UPDATE_USER = gql`
  mutation UserMutation($id: String_comparison_exp, $changes: users_set_input) {
    update_users(where: { auth0_id: $id }, _set: $changes) {
      returning {
        address
        addressLine2
        city
        country
        name
        phone
        postcode
      }
    }
  }
`;

export const USER_DETAILS = gql`
  query GetUserDetails($id: String, $email: String) {
    users(where: { auth0_id: { _eq: $id } }) {
      email
      address
      addressLine2
      city
      country
      name
      phone
      postcode
    }
  }
`;
