import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { Mutation, MutationDeleteTableArgs } from 'api/gql/graphql';

const MUTATION = gql`
  mutation DeleteTable($id: String!) {
    deleteTable(id: $id)
  }
`;

export type Data = Pick<Mutation, 'deleteTable'>;

const useDeleteTableMutation = (
  options?: MutationHookOptions<Data, MutationDeleteTableArgs>
) => {
  return useMutation<Data, MutationDeleteTableArgs>(MUTATION, options);
};

export default useDeleteTableMutation;
