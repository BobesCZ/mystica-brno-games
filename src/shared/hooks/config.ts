import { ThemeOptions } from '@mui/material';

export const DARK_THEME: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#d95d39',
    },
    secondary: {
      main: '#1d170c',
    },
    background: {
      default: '#292112',
      paper: '#292112',
    },
  },
};

export const LIGHT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#ce4b27',
    },
    secondary: {
      main: '#ede4d4',
      dark: '#e7dbc5',
    },
    background: {
      default: '#f9f6f1',
    },
    divider: '#e1d4b7',
  },
};
