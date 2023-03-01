import { set } from 'firebase/database';
import { GAME_NAME_LIST_REF } from './config';

export const saveGameNameList = (gameNameList: string[]): void => {
  const dbReference = GAME_NAME_LIST_REF;

  if (gameNameList.length && dbReference) {
    set(dbReference, gameNameList);
  }
};
