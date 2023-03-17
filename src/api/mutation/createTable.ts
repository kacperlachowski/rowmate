import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { Mutation, MutationCreateTableArgs } from 'api/gql/graphql';

const MUTATION = gql`
  mutation CreateTable($name: String!, $description: String) {
    createTable(name: $name, description: $description) {
      id
    }
  }
`;

export type Data = Pick<Mutation, 'createTable'>;

const useCreateTableMutation = (
  options?: MutationHookOptions<Data, MutationCreateTableArgs>
) => {
  return useMutation<Data, MutationCreateTableArgs>(MUTATION, options);
};

export default useCreateTableMutation;
