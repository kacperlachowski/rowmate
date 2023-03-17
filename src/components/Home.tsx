import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, LinearProgress } from '@mui/material';
import {
  MutationCreateTableArgs,
  MutationUpdateTableArgs,
  Table,
} from 'api/gql/graphql';
import { useCallback, useMemo, useRef, useState } from 'react';
import useCreateTableMutation from '../api/mutation/createTable';
import useDeleteTableMutation from '../api/mutation/deleteTable';
import useUpdateTableMutation from '../api/mutation/updateTable';
import useTables from '../api/query/useTables';
import DataGrid, { Columns } from '../modules/datagrid';
import ActionButton from './ActionButton';
import ConfirmationDialog, {
  ConfirmationDialogHandle,
} from './ConfirmationDialog';
import TableFormDialog, { TableFormDialogHandle } from './TableFormDialog';

const Home = () => {
  const [tables, setTables] = useState<Table[] | null>(null);
  const deleteConfirmationDialog = useRef<ConfirmationDialogHandle>(null);
  const editOrAddRowDialog = useRef<TableFormDialogHandle>(null);
  const [mutationEditTable] = useUpdateTableMutation();
  const [mutationDeleteTable] = useDeleteTableMutation();
  const [mutationAddTable] = useCreateTableMutation();

  const { loading, getMore } = useTables({
    variables: {
      filters: {
        first: 25,
      },
    },
    onCompleted: (data) => {
      setTables(data.tables);
    },
  });

  const handleDeleteTable = useCallback(
    (rowId: string) => {
      const onConfirm = () => mutationDeleteTable({ variables: { id: rowId } });
      deleteConfirmationDialog.current?.openDialog(onConfirm);
    },
    [mutationDeleteTable]
  );

  const handleEditTable = useCallback(
    (rowId: string) => {
      const onConfirm = (variables: MutationUpdateTableArgs) =>
        mutationEditTable({ variables });

      if (!tables) return;

      const index = tables.findIndex((item) => item.id === rowId);
      if (index > -1) {
        editOrAddRowDialog.current?.open(tables[index], {
          variant: 'edit',
          onConfirm,
        });
      }
    },
    [mutationEditTable, tables]
  );

  const handleAddTable = useCallback(() => {
    const onConfirm = (variables: MutationCreateTableArgs) =>
      mutationAddTable({ variables });
    editOrAddRowDialog.current?.open(null, { variant: 'new', onConfirm });
  }, [mutationAddTable]);

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
        renderHeader: () => (
          <Button onClick={handleAddTable} startIcon={<AddIcon />}>
            Create
          </Button>
        ),
      },
    ],
    [handleDeleteTable, handleEditTable, handleAddTable]
  );

  if (loading) {
    return <LinearProgress />;
  }
  return (
    <>
      <TableFormDialog ref={editOrAddRowDialog} />
      <ConfirmationDialog
        ref={deleteConfirmationDialog}
        title="Do you want to delete the item?"
        description="This action is irreversible and the item will be permanently deleted from the system."
      />
      <DataGrid
        onBottom={getMore}
        data={tables ?? []}
        columns={columns as Columns<unknown>}
      />
    </>
  );
};

export default Home;
