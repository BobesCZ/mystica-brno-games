import { Launch } from '@mui/icons-material';
import { Link, Stack } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

type Props = {
  to: LinkProps['to'];
  i18nKey: string;
  external?: boolean;
};

export const FooterLink = ({ to, i18nKey, external }: Props) => {
  const { t } = useTranslation();

  return (
    <Link
      component={RouterLink}
      to={to}
      variant="body1"
      underline="hover"
      color="secondary.main"
      target={external ? '_blank' : undefined}
    >
      <Stack direction="row" alignItems="center" gap={0.5}>
        <Trans t={t} i18nKey={i18nKey} />
        {external && <Launch fontSize="inherit" />}
      </Stack>
    </Link>
  );
};
