import { Box, Container, Stack, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { Urls } from '../../../pages';
import { FooterLink } from './components';

export const AppFooter = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ backgroundColor: '#292112', py: 4 }}>
      <Container>
        <Stack alignItems="center">
          <Typography variant="h4" color="secondary.dark" textAlign="center">
            <Trans t={t} i18nKey="meta.title" />
          </Typography>

          <Stack gap={1.5} mt={2.5}>
            <FooterLink to={Urls.SEARCH} i18nKey="search.pageTitle" />
            <FooterLink to={Urls.RANK} i18nKey="rank.pageTitle" />
            <FooterLink to={Urls.FAQ} i18nKey="faq.pageTitle" />
            <FooterLink to={Urls.EXTERNAL_MYSTICA} i18nKey="footer.goToMystica" external />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
