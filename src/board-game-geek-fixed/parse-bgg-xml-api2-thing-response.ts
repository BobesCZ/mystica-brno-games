/* eslint-disable @typescript-eslint/no-explicit-any */
import { BggThingResponse } from '@code-bucket/board-game-geek';
import { AxiosResponse } from 'axios';
import { xml2js } from 'xml-js';
/**
 * Parses the http response body from BGG XML API 2
 *
 * @param response
 */

export const parseBggXmlApi2ThingResponse = function (response: AxiosResponse) {
  const data = xml2js(response.data, { compact: true });

  if (!(data as any)?.items?.item) {
    return null; // Not found
  }
  return new BggThingResponse(data as any);
};
