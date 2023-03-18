import { update } from 'firebase/database';
import { Game } from '../../types';
import { GAME_LIST_REF } from '../config';
import { validateFirebaseValue } from './utils';

export const updateGameList = (gameList: Game[]): void => {
  const dbReference = GAME_LIST_REF;
  const gameListIndexed = gameList.reduce(
    (acc, item) => ({ ...acc, [item.uid]: validateFirebaseValue(item) }),
    {} as Record<number, Game>,
  );

  if (gameList.length && dbReference) {
    update(dbReference, gameListIndexed);
  }
};
