import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { Table, TableFilters } from 'api/gql/graphql';

const QUERY = gql`
  query Table {
    tables {
      id
      name
      description
    }
  }
`;

export type Data = {
  tables: Table[];
};

const useTables = (options?: QueryHookOptions<Data, TableFilters>) => {
  return useQuery<Data, TableFilters>(QUERY, options);
};

export default useTables;
