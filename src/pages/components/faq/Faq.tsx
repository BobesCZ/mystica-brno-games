import { Box, Typography, Link } from '@mui/material';
import { Container } from '@mui/system';
import { range } from 'lodash-es';
import { Trans, useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Urls } from '../../config';

export const Faq = () => {
  const { t } = useTranslation();
  const content = range(9);
  const feedbackLink = <Link component={RouterLink} to={Urls.FEEDBACK}></Link>;

  return (
    <Container maxWidth="md" sx={{ mb: 10 }}>
      <Box mt={5} mb={3}>
        <Typography variant="h2" textAlign="center">
          <Trans t={t} i18nKey="faq.pageTitle" />
        </Typography>
      </Box>

      {content.map((i) => (
        <Box key={i} my={4}>
          <Typography variant="h3" gutterBottom>
            <Trans t={t} i18nKey={`faq.content.${i}.q`} />
          </Typography>
          <Typography>
            <Trans t={t} i18nKey={`faq.content.${i}.a`} components={{ feedbackLink }} />
          </Typography>
        </Box>
      ))}
    </Container>
  );
};
