import { useMemo } from 'react';
import { Game } from '../../../../types';
import { filterGame } from './utils';
import { useFetchGameList } from '../../../../fetch';
import { NameFilters } from './types';

type UseFilteredGamesByNameProps = {
  filters: NameFilters;
};

type UseFilteredGamesByNameReturn = {
  gameFilteredList: Game[];
  loading: boolean;
};

export const useFilteredGamesByName = ({ filters }: UseFilteredGamesByNameProps): UseFilteredGamesByNameReturn => {
  const { gameList, loading } = useFetchGameList();

  const gameFilteredList = useMemo(
    () => (gameList || []).filter((game) => filterGame(game, filters)),
    [gameList, filters],
  );

  return { gameFilteredList, loading };
};
