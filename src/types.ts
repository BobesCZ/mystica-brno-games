import { BggGame, BggThing } from '@code-bucket/board-game-geek';

export type Game = Pick<BggThing, 'id' | 'primaryName' | 'yearpublished' | 'image'> &
  Pick<BggGame, 'playingtime' | 'minplayers' | 'maxplayers' | 'minage'> & {
    sourceName: string;
    categories: string[];
    mechanics: string[];
  };
