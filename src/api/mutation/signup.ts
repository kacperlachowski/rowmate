import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { Mutation, MutationLoginArgs } from 'api/gql/graphql';

const MUTATION = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export type Data = Pick<Mutation, 'signup'>;

const useSignUpMutation = (
  options?: MutationHookOptions<Data, MutationLoginArgs>
) => {
  return useMutation<Data, MutationLoginArgs>(MUTATION, options);
};

export default useSignUpMutation;
