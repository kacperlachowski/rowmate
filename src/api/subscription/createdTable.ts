import { gql, useSubscription } from '@apollo/client';
import { Subscription } from 'api/gql/graphql';

export const SUBSCRIPTION = gql`
  subscription AddedTable {
    addedTable {
      id
      name
      description
    }
  }
`;

const useCreatedTableSubscription = () => {
  return useSubscription<Subscription['addedTable']>(SUBSCRIPTION);
};

export default useCreatedTableSubscription;
