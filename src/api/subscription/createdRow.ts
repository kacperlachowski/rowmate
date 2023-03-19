import { gql, useSubscription } from '@apollo/client';
import { Subscription } from 'api/gql/graphql';

export const SUBSCRIPTION = gql`
  subscription AddedRow {
    addedRow {
      id
      values
      table {
        id
      }
    }
  }
`;

const useCreatedRowSubscription = () => {
  return useSubscription<Subscription['addedRow']>(SUBSCRIPTION);
};

export default useCreatedRowSubscription;
