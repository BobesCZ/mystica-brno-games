import { useContext, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { orderBy } from 'lodash-es';
import { ControlledSelectOption } from '../../../../shared/components';
import { AppContext } from '../../../../shared/store';
import { Game } from '../../../../shared/types';
import { RankFilters } from '../types';
import { filterGamebyRank, getOrderGameByRank } from '../utils';
import { getRankNameOptions } from './utils';

type Props = {
  filters: RankFilters;
};

type Return = {
  gameFilteredList: Game[];
  gameListLoading: boolean;
  rankNameOptions: ControlledSelectOption<RankFilters, 'rankName'>[];
};

export const useFilteredGamesByRank = ({ filters }: Props): Return => {
  const { t } = useTranslation();
  const { gameList, gameListLoading } = useContext(AppContext);

  const gameFilteredList = useMemo(() => {
    const list = (gameList || []).filter((game) => filterGamebyRank(game, filters));

    return orderBy(list, getOrderGameByRank(filters), 'asc');
  }, [gameList, filters]);

  const rankNameOptions = useMemo(() => getRankNameOptions(t), [t]);

  return {
    gameFilteredList,
    gameListLoading,
    rankNameOptions,
  };
};
