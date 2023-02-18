import { CssBaseline, ThemeProvider } from '@mui/material';
import { useCustomTheme } from './shared/hooks';
import { Search } from './pages/';
import { AppNav } from './shared/components';

function App() {
  const theme = useCustomTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppNav />
      <Search />
    </ThemeProvider>
  );
}

export default App;
