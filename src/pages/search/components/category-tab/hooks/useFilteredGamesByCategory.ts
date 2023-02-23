import { useContext, useMemo } from 'react';
import { Game } from '../../../../../shared/types';
import { filterGamebyCategory } from '../utils';
import { uniq } from 'lodash-es';
import { CategoryFilters, CategoryGroup } from '../types';
import { AppContext } from '../../../../../shared/store';
import { ControlleAutocompleteOption, ControlledSelectOption } from '../../../../../shared/components';
import { useTranslation } from 'react-i18next';
import { getCategoriesOption, getMechanicsOption, getPlayersCountOptions, getPlayingTimeOptions } from './utils';

type Props = {
  filters: CategoryFilters;
  resolvedLanguage: string;
};

type Return = {
  gameFilteredList: Game[];
  gameListLoading: boolean;
  playersCountOptions: ControlledSelectOption<CategoryFilters, 'playersCount'>[];
  playingTimeOptions: ControlledSelectOption<CategoryFilters, 'playingTime'>[];
  categoryOptions: ControlleAutocompleteOption[];
  mechanicsOptions: ControlleAutocompleteOption[];
};

export const useFilteredGamesByCategory = ({ filters, resolvedLanguage }: Props): Return => {
  const { t } = useTranslation();
  const { gameList, gameListLoading } = useContext(AppContext);

  const gameFilteredList = useMemo(
    () => (gameList || []).filter((game) => filterGamebyCategory(game, filters)),
    [gameList, filters],
  );

  const playersCountOptions = useMemo(() => getPlayersCountOptions(t), [t]);
  const playingTimeOptions = useMemo(() => getPlayingTimeOptions(t), [t]);

  const categoryOptions = useMemo(() => {
    const uniqItems = uniq((gameList || []).flatMap(({ categories }) => categories));
    const options = uniqItems.map((item) => getCategoriesOption(t, item));
    const sortedOptions = options.sort((a, b) => a.label.localeCompare(b.label, resolvedLanguage));

    return [
      ...sortedOptions.filter(({ group }) => group === CategoryGroup.Favourites),
      ...sortedOptions.filter(({ group }) => group === CategoryGroup.Topics),
      ...sortedOptions.filter(({ group }) => group === CategoryGroup.Other),
    ];
  }, [gameList, t]);

  const mechanicsOptions = useMemo(() => {
    const uniqItems = uniq((gameList || []).flatMap(({ mechanics }) => mechanics));
    const options = uniqItems.map((item) => getMechanicsOption(t, item));
    const sortedOptions = options.sort((a, b) => a.label.localeCompare(b.label, resolvedLanguage));

    return sortedOptions;
  }, [gameList, t]);

  return {
    gameFilteredList,
    gameListLoading,
    playersCountOptions,
    playingTimeOptions,
    categoryOptions,
    mechanicsOptions,
  };
};
