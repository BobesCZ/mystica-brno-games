import { noop } from 'lodash-es';
import { LocaleLang } from '../locales';
import { AppState } from './types';

export const initialState: AppState = {
  gameList: [],
  gameListLoading: false,
  localeLang: LocaleLang.CS,
  setLocaleLang: noop,
};
