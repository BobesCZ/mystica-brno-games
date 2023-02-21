import { TFunction } from 'i18next';
import { ControlledSelectOption } from '../../../../shared/components';
import { GamePlayingTimeInterval, GamePlayingTimeType } from '../../../../shared/types';
import { CategoryFilters, PlayersCount } from './types';

export const CATEGORY_DEFAULT_VALUES: CategoryFilters = {
  playersCount: 2,
  playingTime: GamePlayingTimeType.FILLER,
  categories: [],
  mechanics: [],
};

export const getCategoryPlayersCountOptions = (
  t: TFunction,
): ControlledSelectOption<CategoryFilters, 'playersCount'>[] => {
  const values: PlayersCount[] = [0, 1, 200, 2, 3, 4, 5, 6, 7];

  return values.map((value) => ({
    value,
    label: t(`search.form.playersCount.options.${value}`),
  }));
};

export const getCategoryPlayingTimeOptions = (t: TFunction): ControlledSelectOption<CategoryFilters, 'playingTime'>[] =>
  Object.values(GamePlayingTimeType).map((value) => ({
    value,
    label: t(`search.form.playingTime.options.${value}`),
  }));

export const CATEGORY_PLAYING_TIME_INTERVALS: Record<GamePlayingTimeType, GamePlayingTimeInterval> = {
  [GamePlayingTimeType.ALL]: { min: 0, max: 9999 },
  [GamePlayingTimeType.FILLER]: { min: 1, max: 20 },
  [GamePlayingTimeType.SHORT]: { min: 21, max: 60 },
  [GamePlayingTimeType.MEDIUM]: { min: 61, max: 90 },
  [GamePlayingTimeType.LONG]: { min: 91, max: 9999 },
};
