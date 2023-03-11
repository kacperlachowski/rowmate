import { gql, MutationHookOptions, useMutation } from "@apollo/client";
import { AuthResponse, MutationLoginArgs } from "../gql/graphql";

const MUTATION = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
      }
      token
    }
  }
`;

const useLoginMutation = (
  options?: MutationHookOptions<AuthResponse, MutationLoginArgs>
) => {
  return useMutation<AuthResponse, MutationLoginArgs>(MUTATION, options);
};

export default useLoginMutation;
