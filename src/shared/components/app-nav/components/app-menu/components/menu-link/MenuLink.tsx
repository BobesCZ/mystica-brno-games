import { Link, ListItem, ListItemButton } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

type Props = {
  to: LinkProps['to'];
  i18nKey: string;
};

export const MenuLink = ({ to, i18nKey }: Props) => {
  const { t } = useTranslation();

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <Link component={RouterLink} to={to} underline="none" color="text.primary" sx={{ width: '100%' }}>
          <Trans t={t} i18nKey={i18nKey} />
        </Link>
      </ListItemButton>
    </ListItem>
  );
};
