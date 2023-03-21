import { Box, Typography, Link } from '@mui/material';
import { Container } from '@mui/system';
import { range } from 'lodash-es';
import { Trans, useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { PageTitle } from '../../../shared/components';
import { Urls } from '../../config';

export const Faq = () => {
  const { t } = useTranslation();
  const content = range(9);
  const feedbackLink = <Link component={RouterLink} to={Urls.FEEDBACK}></Link>;

  return (
    <>
      <PageTitle i18nKey="faq.pageTitle" />

      <Container maxWidth="md" sx={{ mt: 4, mb: 12 }}>
        {content.map((i) => (
          <Box key={i} my={3}>
            <Typography variant="h4" gutterBottom>
              <Trans t={t} i18nKey={`faq.content.${i}.q`} />
            </Typography>
            <Typography>
              <Trans t={t} i18nKey={`faq.content.${i}.a`} components={{ feedbackLink }} />
            </Typography>
          </Box>
        ))}
      </Container>
    </>
  );
};
