import { Launch } from '@mui/icons-material';
import { Link, Stack } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { Urls } from '../../../../../pages';
import { Game } from '../../../../types';
import { parseName } from './utils';

type Props = Pick<Game, 'sourceName'>;

export const ZhLink = ({ sourceName }: Props) => {
  const { t } = useTranslation();

  return (
    <Link
      display="inline-block"
      variant="body1"
      color="text.secondary"
      href={`${Urls.EXTERNAL_ZH}?fType=ftx&keyword=${parseName(sourceName)}`}
      target="_blank"
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <Trans t={t} i18nKey="gameCard.goToZh" />
        <Launch fontSize="inherit" />
      </Stack>
    </Link>
  );
};
