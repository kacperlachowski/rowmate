import { gql, useSubscription } from '@apollo/client';
import { Subscription } from 'api/gql/graphql';

export const SUBSCRIPTION = gql`
  subscription UpdatedTable {
    updatedTable {
      id
      name
      description
    }
  }
`;

const useUpdatedTableSubscription = () => {
  return useSubscription<Subscription['updatedTable']>(SUBSCRIPTION);
};

export default useUpdatedTableSubscription;
