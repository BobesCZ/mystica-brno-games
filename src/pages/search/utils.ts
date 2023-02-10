import { Filters, Game } from '../../types';
import { FILTER_PLAYING_TIME_INTERVALS } from './config';

const hasPlayersCount = (game: Game, { playersCount }: Filters): boolean => {
  if (playersCount === 200) {
    // Case: game exactly for two players
    return game.minplayers === 2 && game.maxplayers === 2;
  }
  return playersCount >= game.minplayers && playersCount <= game.maxplayers;
};

const hasPlayingTime = (game: Game, { playingTime }: Filters): boolean => {
  const { min, max } = FILTER_PLAYING_TIME_INTERVALS[playingTime];

  return game.playingtime >= min && game.playingtime <= max;
};

const hasCategories = (game: Game, { categories }: Filters): boolean =>
  categories.every((item) => game.categories.includes(item.value));

const hasMechanics = (game: Game, { mechanics }: Filters): boolean =>
  mechanics.every((item) => game.mechanics.includes(item.value));

export const filterGame = (game: Game, filters: Filters): boolean => {
  return (
    hasPlayersCount(game, filters) &&
    hasPlayingTime(game, filters) &&
    hasCategories(game, filters) &&
    hasMechanics(game, filters)
  );
};
