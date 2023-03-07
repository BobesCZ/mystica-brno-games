import { Game } from '../../../../shared/types';
import { NameFilters } from './types';

const normalizeString = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const filterGameByName = (game: Game, { name }: NameFilters): boolean =>
  !!name && normalizeString(game.sourceName).includes(normalizeString(name));
