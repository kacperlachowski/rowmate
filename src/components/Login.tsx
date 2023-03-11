import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = useCallback(() => {
    login();
    navigate(from, { replace: true });
  }, []);

  return (
    <>
      Login page
      <br />
      <button onClick={handleSubmit}>Login</button>
    </>
  );
};

export default Login;
