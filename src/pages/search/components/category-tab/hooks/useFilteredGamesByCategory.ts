import { useMemo } from 'react';
import { Game } from '../../../../../types';
import { filterGamebyCategory } from '../utils';
import { uniq } from 'lodash-es';
import { CategoryFilters } from '../types';
import { useFetchGameList } from '../../../../../shared/firebase';

type Props = {
  filters: CategoryFilters;
};

type Return = {
  gameFilteredList: Game[];
  categoryOptions: string[];
  mechanicsOptions: string[];
  loading: boolean;
};

export const useFilteredGamesByCategory = ({ filters }: Props): Return => {
  const { gameList, loading } = useFetchGameList();

  const gameFilteredList = useMemo(
    () => (gameList || []).filter((game) => filterGamebyCategory(game, filters)),
    [gameList, filters],
  );

  const categoryOptions = useMemo(() => uniq((gameList || []).flatMap(({ categories }) => categories)), [gameList]);

  const mechanicsOptions = useMemo(() => uniq((gameList || []).flatMap(({ mechanics }) => mechanics)), [gameList]);

  return { gameFilteredList, categoryOptions, mechanicsOptions, loading };
};
