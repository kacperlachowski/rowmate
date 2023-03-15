import { IconButton } from '@mui/material';
import { MouseEvent } from 'react';

type Props = {
  icon: MUIIcon;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};
const ActionButton = ({ icon: Icon, onClick: handleClick }: Props) => (
  <IconButton size="small" onClick={handleClick}>
    <Icon />
  </IconButton>
);

export default ActionButton;
