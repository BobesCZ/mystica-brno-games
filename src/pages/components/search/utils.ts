import { CategoryKey, MechanicKey } from '../../../shared/bggData';
import { Game } from '../../../shared/types';
import { CATEGORY_PLAYING_TIME_INTERVALS } from './config';
import { CategoryFilters } from './types';

const hasPlayersCount = (game: Game, { playersCount }: CategoryFilters): boolean => {
  switch (playersCount) {
    case 0:
      // Case: allow all options
      return true;

    case 200:
      // Case: game exactly for two players
      return game.minplayers === 2 && game.maxplayers === 2;

    default:
      return playersCount >= (game.minplayers || 0) && playersCount <= (game.maxplayers || 0);
  }
};

const hasPlayingTime = (game: Game, { playingTime }: CategoryFilters): boolean => {
  const { min, max } = CATEGORY_PLAYING_TIME_INTERVALS[playingTime];

  return (game.playingtime || 0) >= min && (game.playingtime || 0) <= max;
};

const hasCategories = (game: Game, { categories }: CategoryFilters): boolean =>
  categories.every((item) => game?.categories?.includes(item.value as CategoryKey));

const hasMechanics = (game: Game, { mechanics }: CategoryFilters): boolean =>
  mechanics.every((item) => game?.mechanics?.includes(item.value as MechanicKey));

export const filterGamebyCategory = (game: Game, filters: CategoryFilters): boolean =>
  hasPlayersCount(game, filters) &&
  hasPlayingTime(game, filters) &&
  hasCategories(game, filters) &&
  hasMechanics(game, filters);

export const orderGameByRating: (game: Game) => unknown = (game) => game.averageRating?.value || 0;

export const orderGameByWeight: (game: Game) => unknown = (game) => game.averageWeight?.value || 0;
