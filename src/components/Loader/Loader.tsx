import { Box, CircularProgress as MuiCircularProgress, CircularProgressProps } from '@mui/material';

interface ILoaderProps extends CircularProgressProps {
  /**
   * If true, show loader as full screen
   */
  isFullScreen?: boolean;
}

const Loader = ({ isFullScreen = false, ...restProps }: ILoaderProps): JSX.Element => {
  if (isFullScreen) {
    return (
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        })}>
        <MuiCircularProgress title="Loading" size={50} {...restProps} />
      </Box>
    );
  }
  return <MuiCircularProgress title="Loading" {...restProps} />;
};

export default Loader;
