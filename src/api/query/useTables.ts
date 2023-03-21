import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { Subscription, Table, QueryTableCountArgs } from 'api/gql/graphql';
import { useCallback, useEffect } from 'react';
import { SUBSCRIPTION as SUBSCRIPTION_CREATED_TABLE } from '../subscription/createdTable';
import { SUBSCRIPTION as SUBSCRIPTION_DELETED_TABLE } from '../subscription/deletedTable';
import { SUBSCRIPTION as SUBSCRIPTION_UPDATED_TABLE } from '../subscription/updatedTable';

export const QUERY = gql`
  query Table($filters: TableFilters, $withContext: Boolean!) {
    tables(filters: $filters) {
      id
      name
      description
      columns @include(if: $withContext) {
        id
        name
      }
      rows @include(if: $withContext) {
        id
        values
      }
    }
  }
`;

export type Data = {
  tables: Table[];
};

const useTables = (
  options?: QueryHookOptions<
    Data,
    QueryTableCountArgs & { withContext?: boolean }
  >
) => {
  const { subscribeToMore, fetchMore, ...query } = useQuery<
    Data,
    QueryTableCountArgs
  >(QUERY, {
    ...options,
    variables: {
      withContext: false,
      ...options?.variables,
      filters: {
        first: 25,
        ...options?.variables?.filters,
      },
    },
  });

  const handleGetMore = useCallback(
    (offset: number) => {
      fetchMore({
        variables: {
          filters: {
            first: 25,
            offset,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            tables: [...prev.tables, ...fetchMoreResult.tables],
          };
        },
      });
    },
    [fetchMore]
  );

  useEffect(() => {
    subscribeToMore<{ addedTable: Subscription['addedTable'] }>({
      document: SUBSCRIPTION_CREATED_TABLE,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        if (
          prev.tables.findIndex(
            (item) => item.id === subscriptionData.data.addedTable.id
          ) > -1
        ) {
          return prev;
        }

        const result = {
          ...prev,
          tables: [subscriptionData.data.addedTable, ...prev.tables],
        };

        return result;
      },
    });

    subscribeToMore<{ deletedTable: Subscription['deletedTable'] }>({
      document: SUBSCRIPTION_DELETED_TABLE,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data || !prev?.tables) return prev;

        const result = {
          ...prev,
          tables: [
            ...prev.tables.filter(
              (item) => item.id !== subscriptionData.data.deletedTable
            ),
          ],
        };

        return result;
      },
    });

    subscribeToMore<{ updatedTable: Subscription['updatedTable'] }>({
      document: SUBSCRIPTION_UPDATED_TABLE,
      updateQuery: (prev, { subscriptionData }) => {
        const updatedTable = subscriptionData.data?.updatedTable;
        if (!updatedTable) return prev;

        const index = prev.tables.findIndex(
          (table) => table.id === updatedTable.id
        );

        if (index === -1) return prev;

        const result = {
          ...prev,
          tables: [
            ...prev.tables.slice(0, index),
            updatedTable as Table,
            ...prev.tables.slice(index + 1),
          ],
        };
        return result;
      },
    });
  }, [subscribeToMore]);

  return { ...query, getMore: handleGetMore };
};

export default useTables;
