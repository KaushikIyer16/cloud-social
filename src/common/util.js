import { createTheme } from '@mui/material/styles';

export const isSuccess = (action) => `${action} Success`

export const isFailure = (action) => `${action} Failure`

export const theme = createTheme({
  palette: {
    primary: {
      main: '#00BCD4',
    },
    secondary: {
      main: '#FFA726',
    },
  },
});
