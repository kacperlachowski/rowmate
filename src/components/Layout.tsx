import { Outlet } from 'react-router-dom';
import Menu from './Menu';

const Layout = () => {
  return (
    <main>
      <Menu />
      <Outlet />
    </main>
  );
};

export default Layout;
