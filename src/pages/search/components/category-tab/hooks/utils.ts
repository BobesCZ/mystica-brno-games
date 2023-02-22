import { TFunction } from 'i18next';
import { ControlleAutocompleteOption, ControlledSelectOption } from '../../../../../shared/components';
import { GamePlayingTimeType } from '../../../../../shared/types';
import { CategoryFilters, PlayersCount } from '../types';

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

export const getCategoriesOption = (t: TFunction, value: string): ControlleAutocompleteOption => ({
  value,
  label: t(`bggCategories.${value}`) || value,
});

export const getMechanicsOption = (t: TFunction, value: string): ControlleAutocompleteOption => ({
  value,
  label: value,
});
