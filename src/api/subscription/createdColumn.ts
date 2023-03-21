import { gql, useSubscription } from '@apollo/client';
import { Subscription } from 'api/gql/graphql';

export const SUBSCRIPTION = gql`
  subscription AddedColumn {
    addedColumn {
      name
      id
      type
      table {
        id
      }
    }
  }
`;

const useCreatedColumnSubscription = () => {
  return useSubscription<Subscription['addedColumn']>(SUBSCRIPTION);
};

export default useCreatedColumnSubscription;
