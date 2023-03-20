import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
import useSignUpMutation from '../api/mutation/signup';
import useAlert from '../hooks/useAlert';
import useAuth from '../hooks/useAuth';

const SignUp = () => {
  const { login } = useAuth();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [values, setValues] = useState({
    username: '',
    password: '',
    repeatPassword: '',
  });

  const [signUpMutation, { loading }] = useSignUpMutation({
    onCompleted: (data) => {
      if (data.signup.token) {
        login(data.signup);
        navigate(from, { replace: true });
        alert('Welcome', 'success');
      }
    },
    onError: (error) => {
      alert(error.message, 'error');
    },
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (values.username.length < 5) {
        alert('The username must be at least 5 characters long', 'error');
        return;
      }

      if (values.password.length < 5) {
        alert('The password must be at least 5 characters long', 'error');
        return;
      }

      if (values.password !== values.repeatPassword) {
        alert('Passwords do not match. Please try again.', 'error');
        return;
      }

      signUpMutation({
        variables: {
          username: values.username,
          password: values.password,
        },
      });
    },
    [signUpMutation, values, alert]
  );

  return (
    <>
      {loading && <LinearProgress />}
      <Paper
        elevation={1}
        component="form"
        autoComplete="off"
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
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <TextField
          autoFocus
          type="text"
          name="username"
          placeholder="Username"
          label="Username"
          value={values.username}
          onChange={handleChange}
          size="small"
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          placeholder="Password"
          label="Password"
          value={values.password}
          onChange={handleChange}
          size="small"
          fullWidth
        />
        <TextField
          type="password"
          name="repeatPassword"
          placeholder="Repeat password"
          label="Repeat password"
          value={values.repeatPassword}
          onChange={handleChange}
          size="small"
          fullWidth
        />
        <Button type="submit" variant="contained" fullWidth>
          Sign in
        </Button>
        <MUILink component={Link} to="/signin" variant="body2">
          Sign in
        </MUILink>
      </Paper>
    </>
  );
};

export default SignUp;
