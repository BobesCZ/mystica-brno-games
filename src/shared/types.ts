import { BggThing } from '@code-bucket/board-game-geek';
import { BggGame } from '../board-game-geek-fixed';

export type Game = Pick<BggThing, 'id' | 'primaryName' | 'yearpublished' | 'image' | 'description'> &
  Pick<BggGame, 'playingtime' | 'minplayers' | 'maxplayers' | 'minage' | 'ratings'> & {
    sourceName: string;
    categories: string[];
    mechanics: string[];
    originalCategories?: string[];
    originalMechanics?: string[];
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
