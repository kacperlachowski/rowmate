import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Button,
  LinearProgress,
  MenuList,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useTables from '../../api/query/useTables';
import useAuth from '../../hooks/useAuth';
import Footer from '../Footer';
import { AppBar, DrawerHeader, Main } from './components';
import drawerWidth from './config';
import Paths from './Paths';
import { Path } from './types';

const staticPaths: Path[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
  },
];

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [paths, setPaths] = useState<Path[] | null>(null);

  const { logout } = useAuth();
  const { loading } = useTables({
    skip: !open,
    onCompleted: (data) => {
      if (data.tables.length) {
        const tablesPaths = data.tables.map((item) => ({
          id: item.id,
          label: item.name,
          path: `/table/${item.id}`,
        }));
        setPaths([...tablesPaths]);
      }
    },
  });

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickMenuItem = useCallback(() => {
    if (isMobile) {
      handleDrawerClose();
    }
  }, [isMobile, handleDrawerClose]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Row<b>m</b>ate
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isMobile ? '100%' : drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MenuList>
          <Paths onClick={handleClickMenuItem} paths={staticPaths} />
          <Divider />
          {loading && <LinearProgress />}
          {paths && <Paths onClick={handleClickMenuItem} paths={paths} />}
        </MenuList>
        <Footer />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default Layout;
