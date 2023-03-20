import { Box, Container, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { DENSE_PADDING, STANDARD_PADDING } from './config';

type Props = {
  i18nKey: string;
  dense?: boolean;
};

export const PageTitle = ({ i18nKey, dense }: Props) => {
  const { t } = useTranslation();
  const { pt, pb, ptMobile, pbMobile } = dense ? DENSE_PADDING : STANDARD_PADDING;

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.secondary.main,
        p: theme.spacing(ptMobile, 0, pbMobile),
        [theme.breakpoints.up('lg')]: {
          p: theme.spacing(pt, 0, pb),
        },
      })}
    >
      <Container>
        <Typography variant="h1" textAlign="center">
          <Trans t={t} i18nKey={i18nKey} />
        </Typography>
      </Container>
    </Box>
  );
};
