import { TFunction } from 'i18next';
import { ControlledSelectOption } from '../../../../shared/components';
import { BGG_RANK_NAMES } from '../../../../shared/bggData';
import { RankFilters } from '../types';

export const getRankNameOptions = (t: TFunction): ControlledSelectOption<RankFilters, 'rankName'>[] =>
  Object.values(BGG_RANK_NAMES).map((value) => ({
    value,
    label: t(`rank.form.rankName.options.${value}`),
  }));
