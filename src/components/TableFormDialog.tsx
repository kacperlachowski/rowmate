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
import {
  MutationCreateTableArgs,
  MutationUpdateTableArgs,
  Table,
} from '../api/gql/graphql';

type FormValue = Pick<Table, 'id' | 'name' | 'description'>;

type ConfirmCallback =
  | {
      variant: 'edit';
      onConfirm: (variables: MutationUpdateTableArgs) => void;
    }
  | {
      variant: 'new';
      onConfirm: (variables: MutationCreateTableArgs) => void;
    };

type DefaultValues = Partial<FormValue> | null;

export type TableFormDialogHandle = {
  open: (defaultValues: DefaultValues, settings: ConfirmCallback) => void;
  close: () => void;
};

const TableFormDialog = forwardRef<TableFormDialogHandle>((_, ref) => {
  const [variant, setVariant] = useState<'new' | 'edit' | null>(null);
  const settingProps = useRef<ConfirmCallback | null>(null);

  const [values, setValues] = useState<FormValue>({
    id: '',
    name: '',
    description: '',
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const closeDialog = useCallback(() => {
    settingProps.current = null;
    setVariant(null);
  }, []);

  useImperativeHandle(ref, () => ({
    open: (defaultValues: DefaultValues, settings: ConfirmCallback) => {
      settingProps.current = settings;
      setVariant(settings.variant);
      if (defaultValues) {
        setValues((prev) => ({ ...prev, ...defaultValues }));
      }
    },
    close: () => {
      closeDialog();
    },
  }));

  const handleConfirm = useCallback(() => {
    if (settingProps.current?.variant) {
      settingProps.current.onConfirm({ ...values });
    }
    closeDialog();
  }, [closeDialog, values]);

  return (
    <Dialog open={variant !== null} onClose={closeDialog}>
      <DialogTitle>
        {variant === 'new' ? 'New table' : `Editing ${values.id}`}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          name="description"
          value={values.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={handleConfirm}>Save</Button>
      </DialogActions>
    </Dialog>
  );
});
TableFormDialog.displayName = 'TableFormDialog';

export default memo(TableFormDialog);
