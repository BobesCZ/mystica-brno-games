import { GamePlayingTimeInterval, GamePlayingTimeType } from '../../../../shared/types';
import { CategoryFilters } from './types';

export const CATEGORY_DEFAULT_VALUES: CategoryFilters = {
  playersCount: 2,
  playingTime: GamePlayingTimeType.FILLER,
  categories: [],
  mechanics: [],
};

export const CATEGORY_PLAYING_TIME_INTERVALS: Record<GamePlayingTimeType, GamePlayingTimeInterval> = {
  [GamePlayingTimeType.ALL]: { min: 0, max: 9999 },
  [GamePlayingTimeType.FILLER]: { min: 1, max: 20 },
  [GamePlayingTimeType.SHORT]: { min: 21, max: 60 },
  [GamePlayingTimeType.MEDIUM]: { min: 61, max: 90 },
  [GamePlayingTimeType.LONG]: { min: 91, max: 9999 },
};
