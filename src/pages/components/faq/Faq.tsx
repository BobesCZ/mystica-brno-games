import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { range } from 'lodash-es';
import { Trans, useTranslation } from 'react-i18next';

export const Faq = () => {
  const { t } = useTranslation();
  const content = range(8);

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
            <Trans t={t} i18nKey={`faq.content.${i}.a`} />
          </Typography>
        </Box>
      ))}
    </Container>
  );
};