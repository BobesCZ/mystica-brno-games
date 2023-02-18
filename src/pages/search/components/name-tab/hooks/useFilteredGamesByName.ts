import { useMemo } from 'react';
import { Game } from '../../../../../types';
import { filterGameByName } from '../utils';
import { NameFilters } from '../types';
import { useFetchGameList } from '../../../../../shared/firebase';

type Props = {
  filters: NameFilters;
};

type Return = {
  gameFilteredList: Game[];
  gameListOptions: string[];
  loading: boolean;
};

export const useFilteredGamesByName = ({ filters }: Props): Return => {
  const { gameList, loading } = useFetchGameList();

  const gameFilteredList = useMemo(
    () => (gameList || []).filter((game) => filterGameByName(game, filters)),
    [gameList, filters],
  );

  const gameListOptions = useMemo(() => (gameList || []).map(({ sourceName }) => sourceName), [gameList]);

  return { gameFilteredList, gameListOptions, loading };
};
