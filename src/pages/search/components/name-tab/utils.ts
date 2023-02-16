import { Game } from '../../../../types';
import { NameFilters } from './types';

export const filterGame = (game: Game, { name }: NameFilters): boolean => {
  return game.sourceName.toLowerCase().includes(name.toLowerCase());
};
