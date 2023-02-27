import { TFunction } from 'i18next';
import { Game } from '../../../../../shared/types';
import { CategoryGroup, MechanicGroup } from '../types';

export type GetAutocompleteOptionsProps = {
  gameList: Game[];
  t: TFunction;
  resolvedLanguage: string;
  key: 'categories' | 'mechanics';
  getGroup: (value: string) => string;
  GroupEnum: typeof CategoryGroup | typeof MechanicGroup;
};
