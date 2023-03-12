import { BggThing, BggThingType } from '@code-bucket/board-game-geek';
import { findKey, uniq } from 'lodash-es';
import { BggGame } from '../../../src/board-game-geek-fixed';
import { Game } from '../../../src/shared/types';
import { BGG_CATEGORIES, BGG_MECHANICS, CategoryKey, MechanicKey } from '../../../src/shared/bggData';

export const getGameFromBggThing = (game: Game, bggThing?: BggThing): Game => {
  if (bggThing?.type === BggThingType.boardGame) {
    const czechVersion = bggThing.versions.find((version) => version.languages.find((lang) => lang.value === 'Czech'));
    const yearpublished = czechVersion?.yearpublished || bggThing.yearpublished;

    if (!yearpublished) {
      throw new Error('Game is still unreleased.');
    }

    const categories = getCategories(bggThing as BggGame);
    const mechanics = getMechanics(bggThing as BggGame);

    const averageRating = {
      value: (bggThing as BggGame).ratings.average,
      usersCount: (bggThing as BggGame).ratings.usersrated,
    };

    const averageWeight = {
      value: (bggThing as BggGame).ratings.averageweight,
      usersCount: (bggThing as BggGame).ratings.numweights,
    };

    const ranks = (bggThing as BggGame).ratings.ranks.map(({ name, value }) => ({
      name,
      value,
    }));

    return {
      ...game,
      id: bggThing.id,
      primaryName: bggThing.primaryName,
      yearpublished,
      image: czechVersion?.image || bggThing.image || '',
      playingtime: (bggThing as BggGame).playingtime,
      minplayers: (bggThing as BggGame).minplayers,
      maxplayers: (bggThing as BggGame).maxplayers,
      minage: (bggThing as BggGame).minage,
      categories,
      mechanics,
      averageRating,
      averageWeight,
      ranks,
    };
  }

  throw new Error('Result is not of type boardgame.');
};

const getCategories = (bggThing: BggGame): CategoryKey[] => {
  const originalCategories = bggThing.categories.map((item) => item.value) || [];

  const categories = (originalCategories || [])
    .map((category) => findKey(BGG_CATEGORIES, (item) => item.includes(category)))
    .filter((item): item is CategoryKey => !!item);

  return uniq(categories);
};

const getMechanics = (bggThing: BggGame): MechanicKey[] => {
  const originalMechanics = bggThing.mechanics.map((item) => item.value) || [];

  const mechanics = (originalMechanics || [])
    .map((mechanic) => findKey(BGG_MECHANICS, (item) => item.includes(mechanic)))
    .filter((item): item is MechanicKey => !!item);

  return uniq(mechanics);
};
