import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLoginMutation from "../api/mutation/login";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginMutation] = useLoginMutation({
    onCompleted: (data) => {
      console.log(data);
      if (data.token) {
        login(data);
        navigate(from, { replace: true });
      }
    },
    onError: (error) => {
      console.log(error);
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
    [username, password]
  );

  return (
    <>
      Login page
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          role="textbox"
          placeholder="username"
          value={username}
          onChange={handleChangeUsername}
        />
        <input
          type="password"
          name="password"
          role="textbox"
          placeholder="password"
          value={password}
          onChange={handleChangePassword}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
