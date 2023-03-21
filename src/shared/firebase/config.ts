import { ref } from 'firebase/database';
import { firebaseDb } from './firebase';

enum DB {
  TEST = 'test',
  PROD = 'prod',
}

const CURRENT_DB: `${DB}` = DB.PROD;

export const GAME_LIST_REF = ref(firebaseDb, `${CURRENT_DB}/gameList`);
export const FEEDBACK_REF = ref(firebaseDb, `${CURRENT_DB}/feedback`);
