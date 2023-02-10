import { CssBaseline, ThemeProvider } from '@mui/material';
import { useCustomTheme } from './hooks';
import { Search } from './pages/';

function App() {
  const theme = useCustomTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Search />
    </ThemeProvider>
  );
}

export default App;
