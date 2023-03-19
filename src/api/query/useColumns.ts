import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Column, Query, QueryTableArgs } from '../gql/graphql';
import { SUBSCRIPTION as SUBSCRIPTION_CREATED_COLUMN } from '../subscription/createdColumn';

export const QUERY = gql`
  query Columns($filters: TableFiltersFindOne!) {
    table(filters: $filters) {
      id
      name
      columns {
        id
        name
        type
      }
    }
  }
`;

export type Data = { table: Query['table'] };

const useColumns = (
  tableId: string,
  options?: QueryHookOptions<Data, QueryTableArgs>
) => {
  const { subscribeToMore, fetchMore, ...query } = useQuery<
    Data,
    QueryTableArgs
  >(QUERY, {
    ...options,
    variables: {
      filters: {
        id: tableId,
        ...options?.variables?.filters,
      },
      ...options?.variables,
    },
  });

  useEffect(() => {
    subscribeToMore<{ addedColumn: Column }>({
      document: SUBSCRIPTION_CREATED_COLUMN,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { addedColumn } = subscriptionData.data;
        if (prev.table?.id === subscriptionData.data.addedColumn.table.id) {
          return {
            ...prev,
            table: {
              ...prev.table,
              columns: [...prev.table.columns, addedColumn],
            },
          };
        }

        return prev;
      },
    });
  }, [subscribeToMore]);

  return query;
};

export default useColumns;
