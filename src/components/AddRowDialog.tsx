import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
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
  useState,
} from 'react';

type Props = {
  onConfirm: (values: object) => void;
};

export type Field = {
  type: 'string' | 'number' | 'boolean';
  name: string;
};

type Row = { value: string | number | boolean } & Field;

export type AddRowDialogHandle = {
  open: (fields: Field[]) => void;
  close: () => void;
};

const AddRowDialog = forwardRef<AddRowDialogHandle, Props>(
  ({ onConfirm }, ref) => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState<Row[]>([]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const { name: inputName, value } = e.target;

      setValues((prev) =>
        prev.map((item) => {
          if (item.name === inputName) {
            let newValue: string | number | boolean = value;

            if (item.type === 'boolean') {
              if (newValue === 'false') {
                newValue = false;
              } else {
                newValue = true;
              }
            } else if (item.type === 'number') {
              if (!Number.isNaN(Number(newValue))) {
                newValue = Number(newValue);
              } else {
                return item;
              }
            }

            return { ...item, value: newValue };
          }
          return item;
        })
      );
    }, []);

    const closeDialog = useCallback(() => {
      setOpen(false);
    }, []);

    useImperativeHandle(ref, () => ({
      open: (fields: Field[]) => {
        setValues(
          fields.map((item) => {
            let defaultValues: string | number | boolean = '';
            if (item.type === 'number') {
              defaultValues = 0;
            } else if (item.type === 'boolean') {
              defaultValues = true;
            }

            const result: Row = {
              ...item,
              value: defaultValues,
            };
            return result;
          })
        );
        setOpen(true);
      },
      close: () => {
        closeDialog();
        setValues([]);
      },
    }));

    const handleConfirm = useCallback(() => {
      const result = values
        .map((item) => ({ name: item.name, value: item.value }))
        .reduce((prev, current) => {
          return { ...prev, [current.name]: current.value };
        }, {});
      onConfirm(result);
      closeDialog();
    }, [closeDialog, onConfirm, values]);

    return (
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="xs">
        <DialogTitle>New row</DialogTitle>
        <DialogContent>
          {values.map((item, index) => {
            if (typeof item.value === 'string') {
              return (
                <TextField
                  key={item.name}
                  autoFocus={index === 0}
                  margin="dense"
                  label={item.name}
                  type="text"
                  fullWidth
                  variant="standard"
                  name={item.name}
                  value={item.value}
                  onChange={handleChange}
                />
              );
            }
            if (typeof item.value === 'number') {
              return (
                <TextField
                  key={item.name}
                  autoFocus={index === 0}
                  margin="dense"
                  label={item.name}
                  type="number"
                  fullWidth
                  variant="standard"
                  name={item.name}
                  value={item.value}
                  onChange={handleChange}
                />
              );
            }
            if (typeof item.value === 'boolean') {
              return (
                <FormControl key={item.name}>
                  <FormLabel id={`dialog-add-row-${item.name}`}>
                    {item.name}
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name={item.name}
                    value={item.value.toString()}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              );
            }
            return null;
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleConfirm}>Add row</Button>
        </DialogActions>
      </Dialog>
    );
  }
);
AddRowDialog.displayName = 'AddRowDialog';

export default memo(AddRowDialog);
