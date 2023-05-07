import { Launch } from '@mui/icons-material';
import { Link, Stack, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Urls } from '../../../../../pages';
import { Game } from '../../../../types';

type Props = Pick<Game, 'id' | 'primaryName'>;

export const BggLink = ({ id, primaryName }: Props) => {
  const { t } = useTranslation();

  return id ? (
    <Tooltip arrow enterTouchDelay={100} title={t('gameCard.goToBgg') ?? ''}>
      <Link
        display="inline-block"
        variant="h4"
        color="text.secondary"
        href={`${Urls.EXTERNAL_BGG}${id}`}
        target="_blank"
      >
        <Stack direction="row" alignItems="center" gap={1}>
          {primaryName}
          <Launch fontSize="inherit" />
        </Stack>
      </Link>
    </Tooltip>
  ) : null;
};
