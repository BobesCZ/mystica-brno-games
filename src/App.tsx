import { CssBaseline, ThemeProvider } from '@mui/material';
import { useCustomTheme } from './shared/hooks';
import { Search } from './pages/';
import { AppNav } from './shared/components';
import { AppContextProvider } from './shared/store';

function App() {
  const theme = useCustomTheme();

  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppNav />
        <Search />
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
