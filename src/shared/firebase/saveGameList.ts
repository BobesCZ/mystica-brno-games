import { ref, update } from 'firebase/database';
import { Game } from '../../types';
import { firebaseDb } from './firebase';

export const saveGameList = (gameList: Game[]): void => {
  const dbReference = ref(firebaseDb, 'gameList');
  const gameListIndexed = gameList.reduce((acc, item) => ({ ...acc, [item.id]: item }), {} as Record<number, Game>);

  if (gameList.length && dbReference) {
    update(dbReference, gameListIndexed);
  }
};
