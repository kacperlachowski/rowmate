import { memo } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Menu = () => {
  const { logout } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/missing">Missing</Link>
        </li>
        <li>
          <Link to="/unauthorized">Unauthorized</Link>
        </li>
        <li>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Menu);
