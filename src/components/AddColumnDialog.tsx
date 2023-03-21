import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {
  ChangeEvent,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ColumnType } from '../api/gql/graphql';

const columnTypeOptions = Object.values(ColumnType)
  .map((columnType) => ({
    value: columnType,
    label: (
      columnType.charAt(0) + columnType.slice(1).toLocaleLowerCase()
    ).replace('_column', ''),
  }))
  .reverse();

type Props = {
  onConfirm: (tableId: string, name: string, columnType: string) => void;
};

export type AddColumnDialogHandle = {
  open: (tableId: string) => void;
  close: () => void;
};

const AddColumnDialog = forwardRef<AddColumnDialogHandle, Props>(
  ({ onConfirm }, ref) => {
    const [open, setOpen] = useState(false);
    const tableIdRef = useRef<string | null>(null);
    const inputNameRef = useRef<HTMLInputElement | null>(null);

    const [columnName, setColumnName] = useState('');
    const [columnType, setColumnType] = useState<string>(
      columnTypeOptions[0].value
    );

    const handleChangeName = useCallback(
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setColumnName(e.target.value);
      },
      []
    );

    const handleChangeColumnType = useCallback((event: SelectChangeEvent) => {
      setColumnType(event.target.value);
    }, []);

    const closeDialog = useCallback(() => {
      setOpen(false);
    }, []);

    useImperativeHandle(ref, () => ({
      open: (tableId: string) => {
        tableIdRef.current = tableId;
        setOpen(true);
        inputNameRef.current?.focus();
      },
      close: () => {
        closeDialog();
      },
    }));

    const handleConfirm = useCallback(() => {
      if (tableIdRef.current) {
        onConfirm(tableIdRef.current, columnName, columnType);
      }
      tableIdRef.current = null;
      closeDialog();
    }, [onConfirm, closeDialog, columnName, columnType]);

    return (
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="xs">
        <DialogTitle>New column</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            name="name"
            value={columnName}
            onChange={handleChangeName}
          />
          <FormControl variant="standard" fullWidth sx={{ marginTop: 1 }}>
            <InputLabel id="add-column-select-column-type">
              Column type
            </InputLabel>
            <Select
              fullWidth
              labelId="add-column-select-column-type"
              value={columnType}
              onChange={handleChangeColumnType}
              label="Column type"
            >
              {columnTypeOptions.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleConfirm}>Add column</Button>
        </DialogActions>
      </Dialog>
    );
  }
);
AddColumnDialog.displayName = 'AddColumnDialog';

export default memo(AddColumnDialog);
