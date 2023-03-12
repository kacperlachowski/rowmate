import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { Query } from 'api/gql/graphql';

const QUERY = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export type Data = Pick<Query, 'me'>;

const useQueryMe = (options?: QueryHookOptions<Data>) => {
  return useQuery<Data>(QUERY, options);
};

export default useQueryMe;
