import { BggGame, BggThing } from '@code-bucket/board-game-geek';

export type Game = Pick<BggThing, 'id' | 'primaryName' | 'yearpublished' | 'image' | 'description'> &
  Pick<BggGame, 'playingtime' | 'minplayers' | 'maxplayers' | 'minage'> & {
    sourceName: string;
    categories: string[];
    mechanics: string[];
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

export enum LogRecordState {
  SUCCESS = 'success',
  SKIPPED = 'skipped',
  ERROR = 'error',
}

export type LogRecord = { sourceName: string; status: LogRecordState };
