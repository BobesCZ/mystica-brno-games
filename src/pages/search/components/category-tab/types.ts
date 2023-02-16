import { ControlledAutocompleteOption } from '../../../../components';
import { GamePlayingTimeType } from '../../../../types';

export type CategoryFilters = {
  playersCount: 0 | 1 | 2 | 200 | 3 | 4 | 5 | 6 | 7;
  playingTime: `${GamePlayingTimeType}`;
  categories: ControlledAutocompleteOption[];
  mechanics: ControlledAutocompleteOption[];
};
