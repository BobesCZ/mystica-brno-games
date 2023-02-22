import { useContext, useMemo } from 'react';
import { Game } from '../../../../../shared/types';
import { filterGamebyCategory } from '../utils';
import { sortBy, uniq } from 'lodash-es';
import { CategoryFilters } from '../types';
import { AppContext } from '../../../../../shared/store';
import { ControlleAutocompleteOption, ControlledSelectOption } from '../../../../../shared/components';
import { useTranslation } from 'react-i18next';
import { getCategoriesOption, getMechanicsOption, getPlayersCountOptions, getPlayingTimeOptions } from './utils';

type Props = {
  filters: CategoryFilters;
};

type Return = {
  gameFilteredList: Game[];
  gameListLoading: boolean;
  playersCountOptions: ControlledSelectOption<CategoryFilters, 'playersCount'>[];
  playingTimeOptions: ControlledSelectOption<CategoryFilters, 'playingTime'>[];
  categoryOptions: ControlleAutocompleteOption[];
  mechanicsOptions: ControlleAutocompleteOption[];
};

export const useFilteredGamesByCategory = ({ filters }: Props): Return => {
  const { t } = useTranslation();
  const { gameList, gameListLoading } = useContext(AppContext);

  const gameFilteredList = useMemo(
    () => (gameList || []).filter((game) => filterGamebyCategory(game, filters)),
    [gameList, filters],
  );

  const playersCountOptions = useMemo(() => getPlayersCountOptions(t), []);
  const playingTimeOptions = useMemo(() => getPlayingTimeOptions(t), []);

  const categoryOptions = useMemo(() => {
    const uniqItems = uniq((gameList || []).flatMap(({ categories }) => categories));
    const options = uniqItems.map((item) => getCategoriesOption(t, item));

    return sortBy(options, 'label');
  }, [gameList]);

  const mechanicsOptions = useMemo(() => {
    const uniqItems = uniq((gameList || []).flatMap(({ mechanics }) => mechanics));
    const options = uniqItems.map((item) => getMechanicsOption(t, item));

    return sortBy(options, 'label');
  }, [gameList]);

  return {
    gameFilteredList,
    gameListLoading,
    playersCountOptions,
    playingTimeOptions,
    categoryOptions,
    mechanicsOptions,
  };
};
