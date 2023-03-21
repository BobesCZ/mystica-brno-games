import { createTheme, Theme } from '@mui/material';
import { LIGHT_THEME } from './config';

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
    },
    ...LIGHT_THEME,
  });

  theme.typography.h1 = {
    fontSize: 26,
    fontWeight: 700,
    [theme.breakpoints.up('lg')]: {
      fontSize: 40,
    },
  };

  theme.typography.h2 = {
    fontSize: 24,
    fontWeight: 700,
    [theme.breakpoints.up('lg')]: {
      fontSize: 36,
    },
  };

  theme.typography.h3 = {
    fontSize: 22,
    fontWeight: 700,
    [theme.breakpoints.up('lg')]: {
      fontSize: 24,
    },
  };

  theme.typography.h4 = {
    fontSize: 18,
    fontWeight: 700,
    [theme.breakpoints.up('lg')]: {
      fontSize: 20,
    },
  };

  theme.typography.body1 = {
    ...theme.typography.body1,
    fontSize: 16,
    [theme.breakpoints.up('lg')]: {
      fontSize: 18,
    },
  };

  theme.typography.body2 = {
    ...theme.typography.body2,
    fontSize: 14,
    [theme.breakpoints.up('lg')]: {
      fontSize: 16,
    },
  };

  return theme;
};
