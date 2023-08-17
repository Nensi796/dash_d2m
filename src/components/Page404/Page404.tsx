import Typography from '@components/Typography';
import { Box } from '@mui/material';

const Page404 = () => (
  <Box>
    <Box
      sx={{
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 'calc(100vh - 150px)',
      }}>
      <Typography color="primary" tag="h1" text="404" />
      <Typography color="primary" tag="h5" text="PAGE NOT FOUND" />
      <Typography
        tag="body2"
        sx={{ mt: '1rem' }}
        text="The page you are looking for is in work in progress or might never existed."
      />
    </Box>
  </Box>
);

export default Page404;
