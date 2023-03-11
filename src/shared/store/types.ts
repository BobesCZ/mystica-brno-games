import { Dispatch, SetStateAction } from 'react';
import { LocaleLang } from '../locales';
import { Game } from '../types';

export type AppState = {
  gameList: Game[];
  gameListLoading: boolean;
  localeLang: `${LocaleLang}`;
  setLocaleLang: Dispatch<SetStateAction<`${LocaleLang}`>>;
};
