import { BggGame, BggThing, BggThingType } from '@code-bucket/board-game-geek';
import axios from 'axios';
import { parseBggXmlApi2SearchResponse, parseBggXmlApi2ThingResponse } from '../../board-game-geek-fixed';
import { Game } from '../../types';

export const getGameFromBggThing = (sourceName: string, bggThing?: BggThing): Game => {
  if (bggThing?.type === BggThingType.boardGame) {
    const czechVersion = bggThing.versions.find((version) => version.languages.find((lang) => lang.value === 'Czech'));
    const categories = (bggThing as BggGame).categories.map((item) => item.value) || [];
    const mechanics = (bggThing as BggGame).mechanics.map((item) => item.value) || [];

    return {
      sourceName,
      id: bggThing.id,
      primaryName: bggThing.primaryName,
      yearpublished: czechVersion?.yearpublished || bggThing.yearpublished,
      image: czechVersion?.image || bggThing.image,
      playingtime: (bggThing as BggGame).playingtime,
      minplayers: (bggThing as BggGame).minplayers,
      maxplayers: (bggThing as BggGame).maxplayers,
      minage: (bggThing as BggGame).minage,
      categories,
      mechanics,
    };
  }

  return {
    sourceName,
    id: 0,
    primaryName: '',
    yearpublished: 0,
    image: '',
    playingtime: 0,
    minplayers: 0,
    maxplayers: 0,
    minage: 0,
    categories: [],
    mechanics: [],
  };
};

export const loadAllGames = async (games: string[]): Promise<Game[]> => {
  const results = await Promise.all(games.map((gameName) => processGame(gameName)));
  const gamesData = results.map(({ sourceName, bggThing }) => getGameFromBggThing(sourceName, bggThing));

  return gamesData;
};

/**
 * 1. Use Search API to get game ID (first search result is considered as best match)
 * 2. Use Thing API to get game info
 */
export const processGame = async (sourceName: string) => {
  const searchResult = await loadSearchData(sourceName);
  const thingId = searchResult[0].id;
  const bggThing = await loadThingData(thingId);
  console.log('bggThing', bggThing);

  return { sourceName, bggThing };
};

export const loadSearchData = async (query: string) => {
  const response = await axios.get(`https://api.geekdo.com/xmlapi2/search?query=${query}`);
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
