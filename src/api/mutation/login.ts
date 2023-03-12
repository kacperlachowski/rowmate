import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { Mutation, MutationLoginArgs } from 'api/gql/graphql';

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

export type Data = Pick<Mutation, 'login'>;

const useLoginMutation = (
  options?: MutationHookOptions<Data, MutationLoginArgs>
) => {
  return useMutation<Data, MutationLoginArgs>(MUTATION, options);
};

export default useLoginMutation;
