import { AppBar, Box, Container, Link, Toolbar, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { AppMenu, LocaleLangSwitch } from './components';
import { Link as RouterLink } from 'react-router-dom';
import { Urls } from '../../../pages';
export const AppNav = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#292112' }}>
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link component={RouterLink} to={Urls.SEARCH} variant="body1" underline="hover">
            <Box display="flex" ml={-1} mr={1}>
              <img width={40} height={40} src="/Mystica_Facebook_400x400_150dpi-300x300.png" />
            </Box>
          </Link>
          <Typography variant="body1" flexGrow={1} sx={{ pt: 0.5 }}>
            <Trans t={t} i18nKey="meta.title" />
          </Typography>
          <LocaleLangSwitch />
          <Box ml={2} mr={-1}>
            <AppMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
