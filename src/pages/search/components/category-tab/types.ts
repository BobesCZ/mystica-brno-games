import { ControlleAutocompleteOption } from '../../../../shared/components';
import { GamePlayingTimeType } from '../../../../shared/types';

export type PlayersCount = 0 | 1 | 2 | 200 | 3 | 4 | 5 | 6 | 7;

export type CategoryFilters = {
  playersCount: PlayersCount;
  playingTime: `${GamePlayingTimeType}`;
  categories: ControlleAutocompleteOption[];
  mechanics: ControlleAutocompleteOption[];
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
