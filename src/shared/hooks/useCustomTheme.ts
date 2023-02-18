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
    ...LIGHT_THEME,
  });

  return theme;
};
