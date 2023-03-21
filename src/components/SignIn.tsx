import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Button,
  LinearProgress,
  Link as MUILink,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useLoginMutation from '../api/mutation/login';
import useAlert from '../hooks/useAlert';
import useAuth from '../hooks/useAuth';

const SignIn = () => {
  const { login } = useAuth();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginMutation, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      if (data.login.token) {
        login(data.login);
        navigate(from, { replace: true });
        alert('Welcome', 'success');
      }
    },
    onError: (error) => {
      alert(error.message, 'error');
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
      {loading && <LinearProgress />}
      <Paper
        elevation={1}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          m: 2,
          p: 2,
          width: '100%',
          maxWidth: 450,
          margin: 'auto',
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          autoFocus
          type="text"
          name="username"
          placeholder="Username"
          label="Username"
          value={username}
          onChange={handleChangeUsername}
          size="small"
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          placeholder="Password"
          label="Password"
          value={password}
          onChange={handleChangePassword}
          size="small"
          fullWidth
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
        <MUILink component={Link} to="/signup" variant="body2">
          Ready to Rowmate? Create your account
        </MUILink>
      </Paper>
    </>
  );
};

export default SignIn;
