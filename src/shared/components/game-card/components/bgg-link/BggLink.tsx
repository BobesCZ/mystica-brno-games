import { Launch } from '@mui/icons-material';
import { Link, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
      href={`https://boardgamegeek.com/boardgame/${id}`}
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
