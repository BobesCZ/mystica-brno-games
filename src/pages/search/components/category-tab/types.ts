import { ControlleAutocompleteOption } from '../../../../shared/components';
import { GamePlayingTimeType } from '../../../../shared/types';
import { MERGED_CATEGORIES } from './config';

export type PlayersCount = 0 | 1 | 2 | 200 | 3 | 4 | 5 | 6 | 7;

export type CategoryFilters = {
  playersCount: PlayersCount;
  playingTime: `${GamePlayingTimeType}`;
  categories: ControlleAutocompleteOption[];
  mechanics: ControlleAutocompleteOption[];
};

export type CategoryKey = keyof typeof MERGED_CATEGORIES;

export enum CategoryGroup {
  Favourites = 'favourites',
  Topics = 'topics',
  Other = 'other',
}
