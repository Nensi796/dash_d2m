import { createTheme } from '@mui/material';

// Create a theme instance.
export const theme = createTheme({
  typography: {
    fontFamily: ['Rubik'].join(','),
    h1: {
      fontFamily: ['__Rubik_34cdcf', '__Rubik_Fallback_34cdcf'].join(','),
    },
  },
  palette: {
    primary: {
      main: '#2B388C',
      light: '#E4E8F0',
      dark: '#2B388C',
    },
    secondary: {
      main: '#33AC2E',
      dark: '#33AC2E',
    },
  },
});
