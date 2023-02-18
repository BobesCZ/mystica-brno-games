import { ref, set } from 'firebase/database';
import { firebaseDb } from './firebase';

export const saveGameNameList = (gameNameList: string[]): void => {
  const dbReference = ref(firebaseDb, 'gameNameList');

  if (gameNameList.length && dbReference) {
    set(dbReference, gameNameList);
  }
};
