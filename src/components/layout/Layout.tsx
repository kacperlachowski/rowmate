import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ViewListIcon from '@mui/icons-material/ViewList';
import {
  Button,
  InputAdornment,
  LinearProgress,
  MenuItem,
  MenuList,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { ChangeEvent, useCallback, useContext, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';
import useTables from '../../api/query/useTables';
import { ThemeModeContext } from '../../context/ThemeProvider';
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
    icon: HomeIcon,
  },
];

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [paths, setPaths] = useState<Path[] | null>(null);
  const [tableName, setTableName] = useState('');
  const [controller, setController] = useState(new AbortController());

  const handleChangeTableName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      controller.abort();
      setController(new AbortController());
      setTableName(e.target.value);
    },
    [controller]
  );

  const { logout } = useAuth();
  const { getMore, loading } = useTables({
    context: { signal: controller.signal },
    variables: {
      filters: {
        search: tableName.length ? tableName : undefined,
      },
    },
    skip: !open,
    onCompleted: (data) => {
      if (data.tables.length) {
        const tablesPaths = data.tables.map((item) => ({
          id: item.id,
          label: item.name,
          path: `/table/${item.id}`,
          icon: ViewListIcon,
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

  const menuListRef = useRef<HTMLUListElement | null>(null);

  const { toggleColorMode } = useContext(ThemeModeContext);

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
            Rowmate
          </Typography>
          <Box>
            <IconButton
              sx={{ ml: 1 }}
              onClick={toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
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
        </MenuList>
        <Divider />
        <Box sx={{ p: 0 }}>
          <TextField
            value={tableName}
            onChange={handleChangeTableName}
            placeholder="Search"
            variant="filled"
            hiddenLabel
            fullWidth
            role="search"
            size="small"
            sx={{ borderRadius: 0 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {loading && <LinearProgress />}
        <Divider />
        <MenuList
          sx={{
            overflowY: 'auto',
            paddingTop: 0,
            '&::-webkit-scrollbar': {
              width: '5px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.primary.main,
              borderRadius: '10px',
            },
          }}
          ref={menuListRef}
        >
          <Virtuoso
            customScrollParent={menuListRef.current ?? undefined}
            data={paths ?? []}
            endReached={getMore}
            itemContent={(_index, { icon: Icon, ...item }) => {
              return (
                <MenuItem
                  onClick={handleClickMenuItem}
                  key={item.id}
                  to={item.path}
                  component={Link}
                >
                  <ListItemIcon>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{item.label}</ListItemText>
                </MenuItem>
              );
            }}
          />
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
