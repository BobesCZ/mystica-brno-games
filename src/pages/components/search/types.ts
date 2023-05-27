import { ControlleAutocompleteOption } from '../../../shared/components';
import { GamePlayingTimeType, GameOrdering } from '../../../shared/types';

export type PlayersCount = 0 | 1 | 2 | 200 | 3 | 4 | 5 | 6 | 7;

export type CategoryFilters = {
  playersCount: PlayersCount;
  playingTime: `${GamePlayingTimeType}`;
  langs: ControlleAutocompleteOption[];
  categories: ControlleAutocompleteOption[];
  mechanics: ControlleAutocompleteOption[];
  ordering: `${GameOrdering}`;
};

export enum CategoryGroup {
  Favourites = 'favourites',
  Topics = 'topics',
  Other = 'other',
}

export enum MechanicGroup {
  Favourites = 'favourites',
  Other = 'other',
}
