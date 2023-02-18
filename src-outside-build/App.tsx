import { CssBaseline, ThemeProvider } from '@mui/material';
import { useCustomTheme } from '../src/shared/hooks';
import { DataLoader } from './data-loader';

function App() {
  const theme = useCustomTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DataLoader />
    </ThemeProvider>
  );
}

export default App;
