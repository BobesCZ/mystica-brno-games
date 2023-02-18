import { ref, update } from 'firebase/database';
import { firebaseDb } from './firebase';
import { validateFirebaseKey } from './utils';

export const saveFailedGameList = (failedGameList: string[]): void => {
  const dbReference = ref(firebaseDb, 'failedGameList');
  const gameListIndexed = failedGameList.reduce(
    (acc, item) => ({ ...acc, [validateFirebaseKey(item)]: item }),
    {} as Record<string, string>,
  );

  if (failedGameList.length && dbReference) {
    update(dbReference, gameListIndexed);
  }
};
