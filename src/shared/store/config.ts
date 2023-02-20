import { noop } from 'lodash-es';
import { Lang } from '../locales';
import { AppState } from './types';

export const initialState: AppState = {
  gameList: [],
  gameListLoading: false,
  lang: Lang.CS,
  setLang: noop,
};
