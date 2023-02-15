import { createTheme, Theme, ThemeOptions } from '@mui/material';

const darkTheme: ThemeOptions = {
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

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#ce4b27',
    },
    secondary: {
      main: '#ede4d4',
    },
    background: {
      default: '#f9f6f1',
    },
  },
};

export const useCustomTheme = (): Theme => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // const theme = useMemo(
  //   () =>
  //     createTheme({
  //       typography: {
  //         fontFamily: ['Fuzzy Bubbles', 'cursive'].join(','),
  //         fontSize: 16,
  //       },
  //       ...(prefersDarkMode ? darkTheme : lightTheme),
  //     }),
  //   [prefersDarkMode],
  // );

  const theme = createTheme({
    typography: {
      fontFamily: ['Fuzzy Bubbles', 'cursive'].join(','),
      fontSize: 16,
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 700,
        fontSize: 24,
      },
    },
    ...lightTheme,
  });

  return theme;
};
