import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

export const AppNav = () => (
  <AppBar position="static" sx={{ backgroundColor: '#292112' }}>
    <Container>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" ml={-1} mr={1}>
          <img width={40} height={40} src="/Mystica_Facebook_400x400_150dpi-300x300.png" />
        </Box>
        <Typography variant="body1" flexGrow={1} sx={{ pt: 0.5 }}>
          Najít hru v Mystice
        </Typography>
      </Toolbar>
    </Container>
  </AppBar>
);
