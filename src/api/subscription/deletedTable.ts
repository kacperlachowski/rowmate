import { gql, useSubscription } from '@apollo/client';
import { Subscription } from 'api/gql/graphql';

export const SUBSCRIPTION = gql`
  subscription DeletedTable {
    deletedTable
  }
`;

const useDeletedTableSubscription = () => {
  return useSubscription<Subscription['deletedTable']>(SUBSCRIPTION);
};

export default useDeletedTableSubscription;
