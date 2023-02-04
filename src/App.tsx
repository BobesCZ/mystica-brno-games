import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import GameDetail from './components/game-detail/GameDetail';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <GameDetail />
      </Container>
    </ThemeProvider>
  );
}

export default App;
