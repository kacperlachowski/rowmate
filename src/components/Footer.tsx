import { Box, Link, Typography } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      marginTop: 'auto',
      p: 1,
      textAlign: 'center',
    }}
  >
    <Typography variant="body2">
      Made with ❤️ by{' '}
      <Link
        href="https://github.com/kacperlachowski/rowmate"
        rel="noopener"
        target="_blank"
      >
        kacperlachowski
      </Link>
    </Typography>
  </Box>
);

export default Footer;
