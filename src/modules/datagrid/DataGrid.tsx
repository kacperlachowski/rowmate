/* eslint-disable react/no-unstable-nested-components */
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, Chip, LinearProgress } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { memo, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import Scroller from './components/Scroller';
import TableBodyComponent from './components/TableBodyComponent';
import TableComponent from './components/TableComponent';
import { DataGridProps, DataItem, VirtuosoItemProps } from './types';

const DataGrid = <T,>({
  data,
  columns,
  onBottom,
  selectable,
}: DataGridProps<T>) => {
  const [rows] = useState(data);
  const [selected, setSelected] = useState<readonly string[]>([]);

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <TableVirtuoso
      useWindowScroll
      data={rows}
      endReached={onBottom}
      overscan={200}
      components={{
        Scroller,
        Table: TableComponent,
        TableHead,
        TableRow: (props: VirtuosoItemProps<T>) => {
          const { item } = props;
          const isItemSelected = isSelected(item.id);

          return (
            <TableRow
              {...props}
              hover
              onClick={(event) => handleClick(event, item.id)}
              selected={isItemSelected}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
            />
          );
        },
        TableBody: TableBodyComponent,
        TableFoot: LinearProgress,
      }}
      fixedHeaderContent={() => {
        return (
          <TableRow>
            {selectable && (
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    selected.length > 0 && selected.length < rows.length
                  }
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
              </TableCell>
            )}
            {columns.map(({ name, type, renderHeader }) => (
              <TableCell
                key={name}
                align={type === 'component' ? 'center' : undefined}
              >
                {renderHeader ? renderHeader() : name}
              </TableCell>
            ))}
          </TableRow>
        );
      }}
      itemContent={(_index: number, item: DataItem<T>) => {
        const { id } = item;
        const isItemSelected = isSelected(id);

        return (
          <>
            {selectable && (
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    'aria-labelledby': id,
                  }}
                />
              </TableCell>
            )}
            {columns.map(({ getValue, name, type }) => {
              const value = getValue(item);
              const key = `${name}-${id}`;

              if (type === 'component') {
                return (
                  <TableCell align="center" size="small" key={key}>
                    {value}
                  </TableCell>
                );
              }
              if (type === 'boolean') {
                return (
                  <TableCell key={key}>
                    {value ? (
                      <CheckIcon fontSize="small" />
                    ) : (
                      <CloseIcon fontSize="small" />
                    )}
                  </TableCell>
                );
              }
              if (type === 'number') {
                return (
                  <TableCell key={key}>
                    <Chip size="small" label={value} />
                  </TableCell>
                );
              }
              return <TableCell key={key}>{value}</TableCell>;
            })}
          </>
        );
      }}
    />
  );
};

export default memo(DataGrid);
