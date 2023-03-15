/* eslint-disable react/no-unstable-nested-components */
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { Table } from 'api/gql/graphql';
import { useCallback, useMemo } from 'react';
import useTables from '../api/query/useTables';
import DataGrid, { Columns } from '../modules/datagrid';
import ActionButton from './ActionButton';

const Home = () => {
  const { data } = useTables();

  const handleDeleteTable = useCallback((rowId: string) => {
    return rowId;
  }, []);

  const handleEditTable = useCallback((rowId: string) => {
    return rowId;
  }, []);

  const columns: Columns<Table> = useMemo(
    () => [
      {
        name: 'ID',
        type: 'string',
        getValue: (item: Table) => item.id,
      },
      {
        name: 'Name',
        type: 'string',
        getValue: (item: Table) => item.name,
      },
      {
        name: 'Description',
        type: 'string',
        getValue: (item: Table) => item.description ?? '',
      },
      {
        name: 'actions',
        type: 'component',
        getValue: (item: Table) => (
          <>
            <ActionButton
              icon={EditIcon}
              onClick={() => handleEditTable(item.id)}
            />
            <ActionButton
              icon={DeleteIcon}
              onClick={() => handleDeleteTable(item.id)}
            />
          </>
        ),
        renderHeader: () => <Button startIcon={<AddIcon />}>Create</Button>,
      },
    ],
    [handleDeleteTable, handleEditTable]
  );

  if (!data) {
    return <>Loading...</>;
  }
  return <DataGrid data={data.tables} columns={columns as Columns<unknown>} />;
};

export default Home;
