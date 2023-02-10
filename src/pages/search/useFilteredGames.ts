import { useMemo } from 'react';
import { ControlledAutocompleteOption } from '../../components';
import { Filters, Game } from '../../types';
import { filterGame } from './utils';
import { uniq } from 'lodash';

type UseFilteredGamesProps = {
  gameList?: Game[];
  filters: Filters;
};

type UseFilteredGamesReturn = {
  gameFilteredList: Game[];
  categoryOptions: ControlledAutocompleteOption[];
  mechanicsOptions: ControlledAutocompleteOption[];
};

export const useFilteredGames = ({ gameList, filters }: UseFilteredGamesProps): UseFilteredGamesReturn => {
  const gameFilteredList = useMemo(
    () => (gameList || []).filter((game) => filterGame(game, filters)),
    [gameList, filters],
  );

  const categoryOptions = useMemo(() => {
    const categoryList = uniq((gameList || []).flatMap(({ categories }) => categories));

    return categoryList.map((category): ControlledAutocompleteOption => ({ label: category, value: category }));
  }, [gameList]);

  const mechanicsOptions = useMemo(() => {
    const mechanicsList = uniq((gameList || []).flatMap(({ mechanics }) => mechanics));

    return mechanicsList.map((mechanics): ControlledAutocompleteOption => ({ label: mechanics, value: mechanics }));
  }, [gameList]);

  return { gameFilteredList, categoryOptions, mechanicsOptions };
};
