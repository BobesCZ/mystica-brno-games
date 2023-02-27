import { BggGame, BggSearch, BggThing, BggThingType } from '@code-bucket/board-game-geek';
import axios from 'axios';
import { load } from 'cheerio';
import { findKey, maxBy, uniq, uniqBy } from 'lodash-es';
import { parseBggXmlApi2SearchResponse, parseBggXmlApi2ThingResponse } from '../../src/board-game-geek-fixed';
import { Game, LogRecord, LogRecordState } from '../../src/shared/types';
import { mysticaHtml } from '../../src/data';
import { stringSimilarity } from 'string-similarity-js';
import { PROCESS_GAME_TIMEOUT } from './config';
import { CategoryKey, MechanicKey, MERGED_CATEGORIES, MERGED_MECHANICS } from '../../src/pages/search/components';

export const getGameFromBggThing = (sourceName: string, bggThing?: BggThing): Game => {
  if (bggThing?.type === BggThingType.boardGame) {
    const czechVersion = bggThing.versions.find((version) => version.languages.find((lang) => lang.value === 'Czech'));
    const yearpublished = czechVersion?.yearpublished || bggThing.yearpublished;

    if (!yearpublished) {
      throw new Error('Game is still unreleased.');
    }

    const categories = (bggThing as BggGame).categories.map((item) => item.value) || [];
    const mechanics = (bggThing as BggGame).mechanics.map((item) => item.value) || [];

    return {
      sourceName,
      id: bggThing.id,
      primaryName: bggThing.primaryName,
      yearpublished,
      image: czechVersion?.image || bggThing.image || '',
      description: (bggThing as BggGame).description,
      playingtime: (bggThing as BggGame).playingtime,
      minplayers: (bggThing as BggGame).minplayers,
      maxplayers: (bggThing as BggGame).maxplayers,
      minage: (bggThing as BggGame).minage,
      categories,
      mechanics,
    };
  }

  throw new Error('Result is not of type boardgame.');
};

export const getGameList = async (
  gameNameList: string[],
  gameList: Game[] = [],
): Promise<{
  newGameList: Game[];
  newFailedGameList: string[];
  log: LogRecord[];
}> => {
  const newGameList: Game[] = [];
  const newFailedGameList: string[] = [];
  const log: LogRecord[] = [];
  // Throw away duplicit parsed names (parsing game and its expansion may results in equal name)
  const parsedList = uniqBy(
    gameNameList.map((sourceName) => ({ sourceName, parsedName: parseSourceName(sourceName) })),
    'parsedName',
  );

  for (const { sourceName, parsedName } of parsedList) {
    try {
      if (gameList.find((item) => item.sourceName === sourceName)) {
        log.push({ sourceName, status: LogRecordState.SKIPPED });
      } else {
        const bggThing = await processGame(parsedName);
        const game = getGameFromBggThing(sourceName, bggThing);

        newGameList.push(game);
        log.push({ sourceName, status: LogRecordState.SUCCESS });

        // Slow iteration because of API request limit
        await new Promise((resolve) => setTimeout(resolve, PROCESS_GAME_TIMEOUT));
      }
    } catch (error) {
      console.error(error, sourceName);
      newFailedGameList.push(sourceName);
      log.push({ sourceName, status: LogRecordState.ERROR });
    }
  }

  return { newGameList, newFailedGameList, log };
};

/**
 * Find result with exact match (fallback: first result)
 */
const getBestResult = (parsedName: string, searchResult: BggSearch[]): BggSearch => {
  const exactMatch = searchResult.find(({ name }) => name === parsedName);

  if (exactMatch) {
    return exactMatch;
  }

  const mostSimilarMatch = maxBy(searchResult, ({ name }) => stringSimilarity(name, parsedName));

  return mostSimilarMatch || searchResult[0];
};

/**
 * 1. Use Search API to get game ID
 * 2. Use Thing API to get game info
 */
export const processGame = async (parsedName: string) => {
  const searchResult = await loadSearchData(parsedName);

  if (!searchResult.length) {
    throw new Error('No results found.');
  }

  const onlyBoardGameType = searchResult.filter(({ type }) => type === BggThingType.boardGame);

  if (!onlyBoardGameType.length) {
    throw new Error('No boardGame found, only expansions.');
  }

  const thingId = getBestResult(parsedName, onlyBoardGameType).id;
  const bggThing = await loadThingData(thingId);

  return bggThing;
};

export const parseSourceName = (sourceName: string) => {
  const replaceSearchs: (string | RegExp)[] = [
    // Everything in brackets `()`
    /\((.*?)\)/,
    // Everything after `–` or `+`s, except `duel`
    /[\–\+]((?!duel).)*/,
    // `edice` and 1 previous word
    /(\S+)\s+edice/,
    '–',
    'základ',
    'KS',
    'CZ',
    'ENG',
  ];

  return replaceSearchs.reduce((acc: string, replaceSearch) => acc.replace(replaceSearch, '').trim(), sourceName);
};

export const loadSearchData = async (parsedName: string) => {
  const response = await axios.get(`https://api.geekdo.com/xmlapi2/search?query=${parsedName}`);
  const bggResponse = parseBggXmlApi2SearchResponse(response);
  const results = bggResponse?.items;

  return results;
};

export const loadThingData = async (thingId: number) => {
  const response = await axios.get(`https://api.geekdo.com/xmlapi2/thing?id=${thingId}&versions=1`);
  const bggResponse = parseBggXmlApi2ThingResponse(response);
  const thing = bggResponse?.item;

  return thing;
};

export const getExternalNameList = (): string[] => {
  const $ = load(mysticaHtml);

  const gameNameList = $('tr:not(:first-child) td:first-child')
    .toArray()
    .map((element) => $(element).text().trim())
    // Ignore rows with only alphabet letters or game expansions
    .filter((text) => text.length > 1 && !text.includes('ozšíření'));

  return uniq(gameNameList);
};

export const getMergedCategories = (originalCategories?: string[]): CategoryKey[] => {
  const mergedCategories = (originalCategories || [])
    .map((category) => findKey(MERGED_CATEGORIES, (item) => item.includes(category)))
    .filter((item): item is CategoryKey => !!item);

  return uniq(mergedCategories);
};

export const getMergedMechanics = (originalMechanics?: string[]): MechanicKey[] => {
  const mergedMechanics = (originalMechanics || [])
    .map((mechanic) => findKey(MERGED_MECHANICS, (item) => item.includes(mechanic)))
    .filter((item): item is MechanicKey => !!item);

  return uniq(mergedMechanics);
};
