import { update } from 'firebase/database';
import { Game } from '../types';
import { GAME_LIST_REF } from './config';

export const saveGameList = (gameList: Game[]): void => {
  const dbReference = GAME_LIST_REF;
  const gameListIndexed = gameList.reduce((acc, item) => ({ ...acc, [item.id]: item }), {} as Record<number, Game>);

  if (gameList.length && dbReference) {
    update(dbReference, gameListIndexed);
  }
};
