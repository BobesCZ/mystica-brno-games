/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBggThingResponse } from '@code-bucket/board-game-geek';
import { AxiosResponse } from 'axios';
import { xml2js } from 'xml-js';
import { BggThingResponse } from './bgg-thing-response.model';
/**
 * Parses the http response body from BGG XML API 2
 *
 * @param response
 */
export const parseBggXmlApi2ThingResponse: (response: AxiosResponse) => BggThingResponse | null = (
  response: AxiosResponse,
) => {
  const data = xml2js(response.data, { compact: true }) as IBggThingResponse;
  if (!data.items.item) {
    return null; // Not found
  }

  return new BggThingResponse(data);
};
