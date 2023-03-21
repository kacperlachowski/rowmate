import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { Mutation, MutationCreateColumnArgs } from 'api/gql/graphql';

const MUTATION = gql`
  mutation CreateColumn($tableId: String!, $name: String!, $type: ColumnType!) {
    createColumn(tableId: $tableId, name: $name, type: $type) {
      id
      name
    }
  }
`;

export type Data = Pick<Mutation, 'createColumn'>;

const useCreateColumnMutation = (
  options?: MutationHookOptions<Data, MutationCreateColumnArgs>
) => {
  return useMutation<Data, MutationCreateColumnArgs>(MUTATION, options);
};

export default useCreateColumnMutation;
