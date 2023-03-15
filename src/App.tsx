import { Box, CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { useCustomTheme } from './shared/hooks';
import { AppRoutes } from './pages/';
import { AppFooter, AppNav } from './shared/components';
import { AppContextProvider } from './shared/store';
import './shared/locales';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const theme = useCustomTheme();

  return (
    <BrowserRouter>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <Stack sx={{ minHeight: '100vh' }}>
            <CssBaseline />
            <AppNav />
            <Box flexGrow={1}>
              <AppRoutes />
            </Box>
            <AppFooter />
          </Stack>
        </ThemeProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
