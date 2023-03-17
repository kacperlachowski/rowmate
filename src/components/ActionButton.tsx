import { IconButton } from '@mui/material';
import { MouseEvent } from 'react';

type Props = {
  icon: MUIIcon;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};
const ActionButton = ({ icon: Icon, onClick: handleClick }: Props) => (
  <IconButton
    size="small"
    onClick={(e) => {
      e.preventDefault();
      handleClick?.(e);
    }}
  >
    <Icon />
  </IconButton>
);

export default ActionButton;
