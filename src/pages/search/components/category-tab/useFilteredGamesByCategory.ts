import { useMemo } from 'react';
import { Game } from '../../../../types';
import { filterGame } from './utils';
import { uniq } from 'lodash';
import { useFetchGameList } from '../../../../fetch';
import { CategoryFilters } from './types';

type UseFilteredGamesProps = {
  filters: CategoryFilters;
};

type UseFilteredGamesReturn = {
  gameFilteredList: Game[];
  categoryOptions: string[];
  mechanicsOptions: string[];
  loading: boolean;
};

export const useFilteredGamesByCategory = ({ filters }: UseFilteredGamesProps): UseFilteredGamesReturn => {
  const { gameList, loading } = useFetchGameList();

  const gameFilteredList = useMemo(
    () => (gameList || []).filter((game) => filterGame(game, filters)),
    [gameList, filters],
  );

  const categoryOptions = useMemo(() => uniq((gameList || []).flatMap(({ categories }) => categories)), [gameList]);

  const mechanicsOptions = useMemo(() => uniq((gameList || []).flatMap(({ mechanics }) => mechanics)), [gameList]);

  return { gameFilteredList, categoryOptions, mechanicsOptions, loading };
};
