import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

export type AlertVariant = 'default' | 'error' | 'success' | 'warning' | 'info';

const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const alert = useCallback(
    (message: string, variant: AlertVariant) => {
      enqueueSnackbar(message, { variant });
    },
    [enqueueSnackbar]
  );

  return alert;
};

export default useAlert;
