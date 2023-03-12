import { MenuItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { Path } from './types';

type Props = {
  paths: Path[];
  onClick?: ((event: React.MouseEvent<HTMLElement>) => void) | undefined;
};

const Paths = ({ paths, onClick = undefined }: Props) => {
  return (
    <>
      {paths.map(({ icon: Icon, ...item }) => (
        <MenuItem
          onClick={onClick}
          key={item.id}
          to={item.path}
          component={Link}
        >
          <ListItemIcon>
            <Icon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{item.label}</ListItemText>
        </MenuItem>
      ))}
    </>
  );
};

export default Paths;
