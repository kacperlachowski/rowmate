import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { Mutation, MutationCreateRowArgs } from 'api/gql/graphql';

const MUTATION = gql`
  mutation CreateRow($tableId: String!, $values: String!) {
    createRow(tableId: $tableId, values: $values) {
      id
      values
    }
  }
`;

export type Data = Pick<Mutation, 'createRow'>;

const useCreateRowMutation = (
  options?: MutationHookOptions<Data, MutationCreateRowArgs>
) => {
  return useMutation<Data, MutationCreateRowArgs>(MUTATION, options);
};

export default useCreateRowMutation;
