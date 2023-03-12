import axios from 'axios';
import { parseBggXmlApi2SearchResponse, parseBggXmlApi2ThingResponse } from '../../../src/board-game-geek-fixed';

export const fetchSearchData = async (parsedName: string) => {
  const response = await axios.get(`https://api.geekdo.com/xmlapi2/search?query=${parsedName}`);
  const bggResponse = parseBggXmlApi2SearchResponse(response);
  const results = bggResponse?.items;

  return results;
};

export const fetchThingData = async (thingId: number) => {
  const response = await axios.get(`https://api.geekdo.com/xmlapi2/thing?id=${thingId}&versions=1&stats=1`);
  const bggResponse = parseBggXmlApi2ThingResponse(response);
  const thing = bggResponse?.item;

  return thing;
};
