import TableBody from '@mui/material/TableBody';
import { forwardRef } from 'react';
import { TableBodyProps } from 'react-virtuoso';

const TableBodyComponent = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props, ref) => <TableBody {...props} ref={ref} />
);
TableBodyComponent.displayName = 'TableBodyComponent';

export default TableBodyComponent;
