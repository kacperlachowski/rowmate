import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { QueryTableArgs, Row } from '../gql/graphql';
import { SUBSCRIPTION as SUBSCRIPTION_CREATED_ROW } from '../subscription/createdRow';

export const QUERY = gql`
  query Rows($filters: TableFiltersFindOne!) {
    table(filters: $filters) {
      id
      rows {
        id
        values
      }
    }
  }
`;

export type Data = {
  table: {
    id: string;
    rows: Row[];
  };
};

const useRows = (
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
    subscribeToMore<{ addedRow: Row }>({
      document: SUBSCRIPTION_CREATED_ROW,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { addedRow } = subscriptionData.data;
        if (prev.table?.id === subscriptionData.data.addedRow.table.id) {
          return {
            ...prev,
            table: {
              ...prev.table,
              rows: [addedRow, ...prev.table.rows],
            },
          };
        }

        return prev;
      },
    });
  }, [subscribeToMore]);

  return query;
};

export default useRows;
