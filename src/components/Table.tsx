import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ColumnType } from '../api/gql/graphql';
import useCreateColumnMutation from '../api/mutation/createColumn';
import useCreateRowMutation from '../api/mutation/createRow';
import useColumns from '../api/query/useColumns';
import useRows from '../api/query/useRows';
import DataGrid, { Column, Columns } from '../modules/datagrid';
import AddColumnDialog, { AddColumnDialogHandle } from './AddColumnDialog';
import AddRowDialog, { AddRowDialogHandle, Field } from './AddRowDialog';

const getColumnType = (
  columnType?: ColumnType
): 'string' | 'number' | 'boolean' => {
  if (columnType === ColumnType.BooleanColumn) return 'boolean';
  if (columnType === ColumnType.NumberColumn) return 'number';
  return 'string';
};

type RouteParams = {
  id: string;
};

const columnOfId: Column<{ id: string } & object> = {
  name: 'ID',
  type: 'string',
  getValue: (item) => item.id,
};

type Rows = ({ id: string } & Record<string, string | number | boolean>)[];

const Table = () => {
  const { id } = useParams<RouteParams>();
  const [name, setName] = useState('');
  const [columns, setColumns] = useState<Columns<any>>([]);
  const [rows, setRows] = useState<Rows>([]);
  const addColumnDialog = useRef<AddColumnDialogHandle | null>(null);
  const addRowDialog = useRef<AddRowDialogHandle | null>(null);

  const [createColumn] = useCreateColumnMutation();
  const [createRow] = useCreateRowMutation();

  useColumns(id ?? '', {
    onCompleted: (data) => {
      if (data?.table?.columns) {
        setName(data.table.name);
        setColumns(
          data.table.columns.map((item) => {
            const columnName = item?.name ?? '';
            return {
              name: columnName,
              type: getColumnType(item?.type),
              getValue: (rowItem: any) => {
                if (columnName in rowItem) {
                  return rowItem[columnName];
                }
                return '' as any;
              },
            };
          })
        );
      }
    },
  });

  useRows(id ?? '', {
    onCompleted: (data) => {
      if (data.table?.rows) {
        const tableRows: Rows = data.table.rows.map((row) => ({
          id: row.id,
          ...JSON.parse(row.values),
        }));
        setRows(tableRows);
      }
    },
  });

  const handleCreateColumn = useCallback(
    (tableId: string, columnName: string, columnType: string) => {
      createColumn({
        variables: {
          tableId,
          name: columnName,
          type: columnType as ColumnType,
        },
      });
    },
    [createColumn]
  );

  const handleClickAddColumn = useCallback(() => {
    if (id) {
      addColumnDialog.current?.open(id);
    }
  }, [id]);

  const handleClickAddRow = useCallback(() => {
    const addRowValues = columns
      .filter((item) => item.type !== 'component')
      .map((item) => ({
        name: item.name,
        type: item.type,
      }))
      .filter((item) => item.type !== 'component');
    addRowDialog.current?.open(addRowValues as Field[]);
  }, [columns]);

  const handleCreateRow = useCallback(
    (values: object) => {
      if (!id) return;

      createRow({
        variables: {
          tableId: id,
          values: JSON.stringify(values),
        },
      });
    },
    [id, createRow]
  );

  return (
    <>
      <AddColumnDialog ref={addColumnDialog} onConfirm={handleCreateColumn} />
      <AddRowDialog ref={addRowDialog} onConfirm={handleCreateRow} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            maxWidth: '100%',
            height: 'auto',
          }}
        >
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, marginLeft: 'auto' }}>
            <Button
              variant="contained"
              onClick={handleClickAddColumn}
              startIcon={<AddIcon />}
            >
              column
            </Button>
            <Button
              variant="contained"
              onClick={handleClickAddRow}
              startIcon={<AddIcon />}
            >
              row
            </Button>
          </Box>
        </Paper>
        <DataGrid data={rows} columns={[columnOfId, ...columns]} />
      </Box>
    </>
  );
};

export default Table;
