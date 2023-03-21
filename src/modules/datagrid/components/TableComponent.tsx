import Table from '@mui/material/Table';
import { TableProps } from 'react-virtuoso';

const TableComponent = (props: TableProps) => (
  <Table {...props} style={{ borderCollapse: 'separate' }} />
);

export default TableComponent;
