import SignpostIcon from '@mui/icons-material/Signpost';
import { Avatar, Link as MUILink, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <Paper
      sx={{
        p: 2,
        width: '100%',
        maxWidth: 400,
        margin: 'auto',
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <SignpostIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Page not Found
      </Typography>
      <Typography sx={{ textAlign: 'center', p: 1 }}>
        Sorry, but the page you are looking for has not been found.
      </Typography>
      <MUILink component={Link} to="/" variant="body2">
        Go to home
      </MUILink>
    </Paper>
  );
};

export default Missing;
