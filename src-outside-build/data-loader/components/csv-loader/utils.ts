import { differenceWith, isEqual, takeWhile, uniqueId } from 'lodash-es';
import { CsvColumns, CsvGame, CsvGameType } from '../../../../src/data';
import { Game, Lang, Status } from '../../../../src/shared/types';
import { CsvGameWithNotes } from './types';

/**
 * Every row with empty TYPE is merged to nearest upper row with TYPE = GAME into its `notes`
 */
export const mergeNotesToCsvGame = (csvGames: CsvGame[]): CsvGameWithNotes[] =>
  csvGames.reduce((acc: CsvGameWithNotes[], csvGame: CsvGame, index) => {
    if (csvGame[CsvColumns.TYPE] === CsvGameType.GAME) {
      const noteRelatedToGame = takeWhile(csvGames.slice(index + 1), (i) => i[CsvColumns.TYPE] !== CsvGameType.GAME);
      const csvGameWithNotes = {
        ...csvGame,
        notes: noteRelatedToGame?.map((csvGame) => csvGame[CsvColumns.SOURCE_NAME]),
      };

      return [...acc, csvGameWithNotes];
    }

    return acc;
  }, []);

export const getGameFromCsv = (csvGame: CsvGameWithNotes): Game => {
  const langs = csvGame[CsvColumns.LANGS]
    .split(',')
    .map((lang) => lang.trim())
    .filter((lang): lang is Lang => Object.values(Lang).includes(lang as Lang));

  return {
    uid: uniqueId(),
    sourceName: csvGame[CsvColumns.SOURCE_NAME],
    id: parseInt(csvGame[CsvColumns.ID]) || undefined,
    langs,
    notes: csvGame.notes,
    status: Status.NEW,
  };
};

const isGameEqual = (csvGame: Game, game: Game) =>
  csvGame.sourceName === game.sourceName &&
  (csvGame.id === undefined || csvGame.id === game.id) &&
  isEqual(csvGame.langs, game.langs || []) &&
  isEqual(csvGame.notes, game.notes || []);

export const getGameListMergedByDiff = (csvGameList: Game[], gameList: Game[]): Game[] => {
  if (!csvGameList.length || !gameList.length) {
    return [];
  }

  const diffGameList = differenceWith(csvGameList, gameList, isGameEqual);

  const mergedGameList = diffGameList.map((csvGame) => {
    const dbGame = gameList.find(({ sourceName }) => csvGame.sourceName === sourceName);

    return dbGame ? { ...dbGame, id: csvGame.id, langs: csvGame.langs, notes: csvGame.notes } : csvGame;
  });

  return mergedGameList;
};
