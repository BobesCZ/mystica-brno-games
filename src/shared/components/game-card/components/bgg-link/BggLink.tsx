import { Launch } from '@mui/icons-material';
import { Link, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Urls } from '../../../../../pages';
import { Game } from '../../../../types';

type Props = {
  id: Game['id'];
  primaryName: Game['primaryName'];
};

export const BggLink = ({ id, primaryName }: Props) => {
  const { t } = useTranslation();

  return id ? (
    <Link
      display="inline-block"
      variant="h4"
      color="text.secondary"
      href={`${Urls.EXTERNAL_BGG}${id}`}
      target="_blank"
      title={t('gameCard.goToBgg') ?? ''}
    >
      <Stack direction="row" alignItems="center" mb={1.5} gap={1}>
        {primaryName}
        <Launch fontSize="small" />
      </Stack>
    </Link>
  ) : null;
};
