import { TFunction } from 'i18next';
import { findKey } from 'lodash-es';
import { ControlleAutocompleteOption, ControlledSelectOption } from '../../../../../shared/components';
import { GamePlayingTimeType } from '../../../../../shared/types';
import { GROUPED_CATEGORIES } from '../config';
import { CategoryFilters, CategoryGroup, CategoryKey, PlayersCount } from '../types';

export const getPlayersCountOptions = (t: TFunction): ControlledSelectOption<CategoryFilters, 'playersCount'>[] => {
  const values: PlayersCount[] = [0, 1, 200, 2, 3, 4, 5, 6, 7];

  return values.map((value) => ({
    value,
    label: t(`search.form.playersCount.options.${value}`),
  }));
};

export const getPlayingTimeOptions = (t: TFunction): ControlledSelectOption<CategoryFilters, 'playingTime'>[] =>
  Object.values(GamePlayingTimeType).map((value) => ({
    value,
    label: t(`search.form.playingTime.options.${value}`),
  }));

const getCategoryGroup = (value: string): string =>
  findKey(GROUPED_CATEGORIES, (item) => item?.includes(value as CategoryKey)) || CategoryGroup.Other;

export const getCategoriesOption = (t: TFunction, value: string): ControlleAutocompleteOption => {
  const group = getCategoryGroup(value);

  return {
    value,
    label: t(`bggCategories.${value}`) || value,
    group: group,
    groupLabel: t(`search.form.categories.groups.${group}`) || '',
  };
};

export const getMechanicsOption = (t: TFunction, value: string): ControlleAutocompleteOption => ({
  value,
  label: value,
});
