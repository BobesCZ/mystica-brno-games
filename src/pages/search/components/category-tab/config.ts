import { ControlledSelectOption } from '../../../../components';
import { GamePlayingTimeInterval, GamePlayingTimeType } from '../../../../types';
import { CategoryFilters } from './types';

export const CATEGORY_DEFAULT_VALUES: CategoryFilters = {
  playersCount: 2,
  playingTime: GamePlayingTimeType.FILLER,
  categories: [],
  mechanics: [],
};

export const CATEGORY_PLAYERS_COUNT_OPTIONS: ControlledSelectOption<CategoryFilters, 'playersCount'>[] = [
  { value: 0, label: '– nezáleží –' },
  { value: 1, label: 'pro 1 hráče' },
  { value: 200, label: 'pro 2 hráče (jen dvojkovky)' },
  { value: 2, label: 'pro 2 hráče' },
  { value: 3, label: 'pro 3 hráče' },
  { value: 4, label: 'pro 4 hráče' },
  { value: 5, label: 'pro 5 hráčů' },
  { value: 6, label: 'pro 6 hráčů' },
  { value: 7, label: 'pro 7 a více hráčů' },
];

export const CATEGORY_PLAYING_TIME_OPTIONS: ControlledSelectOption<CategoryFilters, 'playingTime'>[] = [
  { value: GamePlayingTimeType.ALL, label: '– nezáleží –' },
  { value: GamePlayingTimeType.FILLER, label: 'filler (do 20 min)' },
  { value: GamePlayingTimeType.SHORT, label: 'krátká (21 - 60 min)' },
  { value: GamePlayingTimeType.MEDIUM, label: 'středně dlouhá (61 - 90 min)' },
  { value: GamePlayingTimeType.LONG, label: 'na celý večer (nad 91 min)' },
];

export const CATEGORY_PLAYING_TIME_INTERVALS: Record<GamePlayingTimeType, GamePlayingTimeInterval> = {
  [GamePlayingTimeType.ALL]: { min: 0, max: 9999 },
  [GamePlayingTimeType.FILLER]: { min: 1, max: 20 },
  [GamePlayingTimeType.SHORT]: { min: 21, max: 60 },
  [GamePlayingTimeType.MEDIUM]: { min: 61, max: 90 },
  [GamePlayingTimeType.LONG]: { min: 91, max: 9999 },
};