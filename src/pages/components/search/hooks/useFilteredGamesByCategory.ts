import { useContext, useMemo } from 'react';
import { Game, GameOrdering } from '../../../../shared/types';
import { filterGamebyCategory, orderGameByRating, orderGameByWeight } from '../utils';
import { CategoryFilters, CategoryGroup, MechanicGroup } from '../types';
import { AppContext } from '../../../../shared/store';
import { ControlleAutocompleteOption, ControlledSelectOption } from '../../../../shared/components';
import { useTranslation } from 'react-i18next';
import {
  getAutocompleteOptions,
  getCategoryGroup,
  getLangsOptions,
  getMechanicGroup,
  getOrderingOptions,
  getPlayersCountOptions,
  getPlayingTimeOptions,
} from './utils';
import { orderBy } from 'lodash-es';

type Props = {
  filters: CategoryFilters;
  resolvedLanguage: string;
};

type Return = {
  gameFilteredList: Game[];
  gameListLoading: boolean;
  playersCountOptions: ControlledSelectOption<CategoryFilters, 'playersCount'>[];
  playingTimeOptions: ControlledSelectOption<CategoryFilters, 'playingTime'>[];
  langsOptions: ControlleAutocompleteOption[];
  categoryOptions: ControlleAutocompleteOption[];
  mechanicsOptions: ControlleAutocompleteOption[];
  orderingOptions: ControlledSelectOption<CategoryFilters, 'ordering'>[];
};

export const useFilteredGamesByCategory = ({ filters, resolvedLanguage }: Props): Return => {
  const { t } = useTranslation();
  const { gameList, gameListLoading } = useContext(AppContext);

  const gameFilteredList = useMemo(() => {
    const list = (gameList || []).filter((game) => filterGamebyCategory(game, filters));

    if (filters.ordering === GameOrdering.NAME) {
      return list.sort((a, b) => a.sourceName.localeCompare(b.sourceName, resolvedLanguage));
    }

    if (filters.ordering === GameOrdering.WEIGHT) {
      return orderBy(list, orderGameByWeight, 'desc');
    }

    return orderBy(list, orderGameByRating, 'desc');
  }, [gameList, filters]);

  const playersCountOptions = useMemo(() => getPlayersCountOptions(t), [t]);
  const playingTimeOptions = useMemo(() => getPlayingTimeOptions(t), [t]);
  const langsOptions = useMemo(() => getLangsOptions(t), [t]);

  const categoryOptions = useMemo(
    () =>
      getAutocompleteOptions({
        gameList,
        t,
        resolvedLanguage,
        key: 'categories',
        getGroup: getCategoryGroup,
        GroupEnum: CategoryGroup,
      }),
    [gameList, t],
  );

  const mechanicsOptions = useMemo(
    () =>
      getAutocompleteOptions({
        gameList,
        t,
        resolvedLanguage,
        key: 'mechanics',
        getGroup: getMechanicGroup,
        GroupEnum: MechanicGroup,
      }),
    [gameList, t],
  );

  const orderingOptions = useMemo(() => getOrderingOptions(t), [t]);

  return {
    gameFilteredList,
    gameListLoading,
    playersCountOptions,
    playingTimeOptions,
    langsOptions,
    categoryOptions,
    mechanicsOptions,
    orderingOptions,
  };
};
