import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { forwardRef } from 'react';
import { ScrollerProps } from 'react-virtuoso';

const Scroller = forwardRef<HTMLDivElement, ScrollerProps>((props, ref) => (
  <TableContainer component={Paper} {...props} ref={ref} />
));
Scroller.displayName = 'Scroller';

export default Scroller;
