import { ref } from 'firebase/database';
import { firebaseDb } from './firebase';

enum DB {
  TEST = 'test',
  PROD = 'prod',
}

const CURRENT_DB: `${DB}` = DB.TEST;

export const FAILED_GAME_LIST_REF = ref(firebaseDb, `${CURRENT_DB}/failedGameList`);
export const GAME_LIST_REF = ref(firebaseDb, `${CURRENT_DB}/gameList`);
export const GAME_NAME_LIST_REF = ref(firebaseDb, `${CURRENT_DB}/gameNameList`);
