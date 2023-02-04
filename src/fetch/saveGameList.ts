import { ref, set } from 'firebase/database';
import { Game } from '../types';
import { firebaseDb } from './firebase';

export const saveGameList = (gameList: Game[]): void => {
  const dbReference = ref(firebaseDb, 'gameList');

  if (gameList.length && dbReference) {
    set(dbReference, gameList);
  }
};
