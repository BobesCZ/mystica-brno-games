import { parseBggXmlApi2SearchResponse, parseBggXmlApi2ThingResponse } from '@code-bucket/board-game-geek';
import axios from 'axios';

export const fetchSearchData = async (parsedName: string) => {
  const { data } = await axios.get(`https://api.geekdo.com/xmlapi2/search?query=${parsedName}`);
  const bggResponse = parseBggXmlApi2SearchResponse(data);
  const results = bggResponse?.items;

  return results;
};

export const fetchThingData = async (thingId: number) => {
  const { data } = await axios.get(`https://api.geekdo.com/xmlapi2/thing?id=${thingId}&versions=1&stats=1`);
  const bggResponse = parseBggXmlApi2ThingResponse(data);
  const thing = bggResponse?.item;

  return thing;
};
