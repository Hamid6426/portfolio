import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0000ff',
    },
    background: {
      default: '#000011',
      paper: '#000066',
      appbar: '#000000',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

export default theme;
