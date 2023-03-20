import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const alert = useCallback(
    (
      message: string,
      variant: 'default' | 'error' | 'success' | 'warning' | 'info'
    ) => {
      enqueueSnackbar(message, { variant });
    },
    [enqueueSnackbar]
  );

  return alert;
};

export default useAlert;
