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
      h3: {
        fontSize: 24,
        fontWeight: 700,
      },
      h4: {
        fontSize: 20,
        fontWeight: 700,
      },
    },
    ...LIGHT_THEME,
  });

  theme.typography.h1 = {
    fontSize: 40,
    fontWeight: 700,
    [theme.breakpoints.up('lg')]: {
      fontSize: 48,
    },
  };

  theme.typography.h2 = {
    fontSize: 32,
    fontWeight: 700,
    [theme.breakpoints.up('lg')]: {
      fontSize: 36,
    },
  };

  return theme;
};
