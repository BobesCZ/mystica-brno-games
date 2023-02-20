import { Dispatch, SetStateAction } from 'react';
import { Lang } from '../locales';
import { Game } from '../types';

export type AppState = {
  gameList: Game[];
  gameListLoading: boolean;
  lang: `${Lang}`;
  setLang: Dispatch<SetStateAction<`${Lang}`>>;
};
