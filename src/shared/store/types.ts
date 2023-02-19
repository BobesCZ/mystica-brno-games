import { Game } from '../types';

export type AppState = {
  gameList: Game[];
  gameListLoading: boolean;
};
