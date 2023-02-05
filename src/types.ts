import { BggGame, BggThing } from '@code-bucket/board-game-geek';
import { ControlledAutocompleteOption } from './components';

export type Game = Pick<BggThing, 'id' | 'primaryName' | 'yearpublished' | 'image'> &
  Pick<BggGame, 'playingtime' | 'minplayers' | 'maxplayers' | 'minage'> & {
    sourceName: string;
    categories: string[];
    mechanics: string[];
  };

export enum GamePlayingTimeType {
  FILLER = 'filler',
  SHORT = 'short',
  MEDIUM = 'medium',
  LONG = 'long',
}

export type GamePlayingTimeInterval = {
  min: number;
  max: number;
};

export type Filters = {
  playersCount: 1 | 2 | 200 | 3 | 4 | 5 | 6 | 7;
  playingTime: `${GamePlayingTimeType}`;
  categories: ControlledAutocompleteOption[];
  mechanics: ControlledAutocompleteOption[];
};
