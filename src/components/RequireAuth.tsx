import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useQueryMe from '../api/query/useQueryMe';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const { user: isLoggedIn, logout } = useAuth();
  const location = useLocation();

  useQueryMe({
    onError: (e) => {
      if (e.message === 'Unauthorized') {
        logout();
      }
    },
  });

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
