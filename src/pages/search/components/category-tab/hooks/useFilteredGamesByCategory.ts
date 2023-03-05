import { useContext, useMemo } from 'react';
import { Game } from '../../../../../shared/types';
import { filterGamebyCategory, getOrderGameBy } from '../utils';
import { CategoryFilters, CategoryGroup, MechanicGroup } from '../types';
import { AppContext } from '../../../../../shared/store';
import { ControlleAutocompleteOption, ControlledSelectOption } from '../../../../../shared/components';
import { useTranslation } from 'react-i18next';
import {
  getAutocompleteOptions,
  getCategoryGroup,
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
  categoryOptions: ControlleAutocompleteOption[];
  mechanicsOptions: ControlleAutocompleteOption[];
  orderingOptions: ControlledSelectOption<CategoryFilters, 'ordering'>[];
};

export const useFilteredGamesByCategory = ({ filters, resolvedLanguage }: Props): Return => {
  const { t } = useTranslation();
  const { gameList, gameListLoading } = useContext(AppContext);

  const gameFilteredList = useMemo(() => {
    const list = (gameList || []).filter((game) => filterGamebyCategory(game, filters));

    return orderBy(list, getOrderGameBy(filters), 'desc');
  }, [gameList, filters]);

  const playersCountOptions = useMemo(() => getPlayersCountOptions(t), [t]);
  const playingTimeOptions = useMemo(() => getPlayingTimeOptions(t), [t]);

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
    categoryOptions,
    mechanicsOptions,
    orderingOptions,
  };
};
