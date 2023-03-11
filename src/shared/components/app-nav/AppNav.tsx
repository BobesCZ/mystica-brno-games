import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { LocaleLangSwitch } from './components';

export const AppNav = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#292112' }}>
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" ml={-1} mr={1}>
            <img width={40} height={40} src="/Mystica_Facebook_400x400_150dpi-300x300.png" />
          </Box>
          <Typography variant="body1" flexGrow={1} sx={{ pt: 0.5 }}>
            <Trans t={t} i18nKey="search.pageTitle" />
          </Typography>
          <LocaleLangSwitch />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
