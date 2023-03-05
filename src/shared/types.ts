import { BggThing } from '@code-bucket/board-game-geek';
import { BggGame, IBggRank } from '../board-game-geek-fixed';
import { CategoryKey, MechanicKey } from './bggData';

type Rank = Pick<IBggRank, 'name' | 'value'>;

type Rating = {
  value: number;
  usersCount: number;
};

export type Game = Pick<BggThing, 'id' | 'primaryName' | 'yearpublished' | 'image'> &
  Pick<BggGame, 'playingtime' | 'minplayers' | 'maxplayers' | 'minage'> & {
    sourceName: string;
    categories: CategoryKey[];
    mechanics: MechanicKey[];
    averageRating: Rating;
    averageWeight: Rating;
    ranks: Rank[];
  };

export enum GamePlayingTimeType {
  ALL = 'all',
  FILLER = 'filler',
  SHORT = 'short',
  MEDIUM = 'medium',
  LONG = 'long',
}

export type GamePlayingTimeInterval = {
  min: number;
  max: number;
};

export enum GameOrdering {
  NAME = 'name',
  RATING = 'rating',
}

export enum LogRecordState {
  SUCCESS = 'success',
  SKIPPED = 'skipped',
  ERROR = 'error',
}

export type LogRecord = { sourceName: string; status: LogRecordState };
