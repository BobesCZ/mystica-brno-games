import { Trans, useTranslation } from 'react-i18next';
import { Game } from '../../../../types';

type Props = Pick<Game, 'minplayers' | 'maxplayers'>;

export const PlayersCountString = ({ minplayers, maxplayers }: Props) => {
  const { t } = useTranslation();

  if (minplayers === maxplayers && minplayers === 1) {
    return <Trans t={t} i18nKey="gameCard.playersCount" count={1} values={{ minplayers }} />;
  }

  if (minplayers === maxplayers && minplayers === 2) {
    return <Trans t={t} i18nKey="gameCard.playersCount" count={2} values={{ minplayers }} />;
  }

  return <Trans t={t} i18nKey="gameCard.playersCountInterval" values={{ minplayers, maxplayers }} count={maxplayers} />;
};
