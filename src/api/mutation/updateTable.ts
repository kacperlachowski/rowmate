import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { Mutation, MutationUpdateTableArgs } from 'api/gql/graphql';

const MUTATION = gql`
  mutation UpdateTable($id: String!, $name: String, $description: String) {
    updateTable(id: $id, name: $name, description: $description) {
      id
    }
  }
`;

export type Data = Pick<Mutation, 'updateTable'>;

const useUpdateTableMutation = (
  options?: MutationHookOptions<Data, MutationUpdateTableArgs>
) => {
  return useMutation<Data, MutationUpdateTableArgs>(MUTATION, options);
};

export default useUpdateTableMutation;
