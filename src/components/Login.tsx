import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useLoginMutation from '../api/mutation/login';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginMutation] = useLoginMutation({
    onCompleted: (data) => {
      if (data.login.token) {
        login(data);
        navigate(from, { replace: true });
      }
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleChangeUsername = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    },
    []
  );

  const handleChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      loginMutation({
        variables: {
          username,
          password,
        },
      });
    },
    [loginMutation, username, password]
  );

  return (
    <>
      Login page
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={handleChangeUsername}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handleChangePassword}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
