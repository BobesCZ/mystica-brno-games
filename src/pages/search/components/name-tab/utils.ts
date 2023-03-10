import { Game } from '../../../../shared/types';
import { NameFilters } from './types';

export const filterGameByName = (game: Game, { name }: NameFilters): boolean =>
  !!name && game.sourceName.toLowerCase().includes(name.toLowerCase());
