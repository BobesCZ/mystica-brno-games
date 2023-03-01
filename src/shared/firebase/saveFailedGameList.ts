import { update } from 'firebase/database';
import { FAILED_GAME_LIST_REF } from './config';
import { validateFirebaseKey } from './utils';

export const saveFailedGameList = (failedGameList: string[]): void => {
  const dbReference = FAILED_GAME_LIST_REF;
  const gameListIndexed = failedGameList.reduce(
    (acc, item) => ({ ...acc, [validateFirebaseKey(item)]: item }),
    {} as Record<string, string>,
  );

  if (failedGameList.length && dbReference) {
    update(dbReference, gameListIndexed);
  }
};
