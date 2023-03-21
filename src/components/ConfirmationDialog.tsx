import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Transition from './Transition';

type Props = {
  title: string;
  description: string;
};

export type ConfirmationDialogHandle = {
  openDialog: (onConfirm?: () => void) => void;
  closeDialog: () => void;
};

const ConfirmationDialog = forwardRef<ConfirmationDialogHandle, Props>(
  ({ title, description }, ref) => {
    const [open, setOpen] = useState(false);
    const onConfirmAction = useRef<(() => void) | null>(null);

    const closeDialog = useCallback(() => {
      onConfirmAction.current = null;
      setOpen(false);
    }, []);

    useImperativeHandle(ref, () => ({
      openDialog: (onConfirm?: () => void) => {
        if (onConfirm) {
          onConfirmAction.current = onConfirm;
        }
        setOpen(true);
      },
      closeDialog: () => closeDialog(),
    }));

    const handleConfirm = useCallback(() => {
      onConfirmAction.current?.();
      closeDialog();
    }, [closeDialog]);

    return (
      <Dialog
        open={!!open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Disagree</Button>
          <Button onClick={handleConfirm}>Agree</Button>
        </DialogActions>
      </Dialog>
    );
  }
);
ConfirmationDialog.displayName = 'ConfirmationDialog';

export default memo(ConfirmationDialog);
