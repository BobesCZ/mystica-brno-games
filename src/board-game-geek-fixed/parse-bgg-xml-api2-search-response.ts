import { BggSearchResponse, IBggSearchResponse } from '@code-bucket/board-game-geek';
import { AxiosResponse } from 'axios';
import { xml2js } from 'xml-js';

/**
 * Parses the http response body from BGG XML API 2
 *
 * @param response
 */
export const parseBggXmlApi2SearchResponse: (response: AxiosResponse) => BggSearchResponse = (
  response: AxiosResponse,
) => {
  const data = xml2js(response.data, { compact: true }) as IBggSearchResponse;
  return new BggSearchResponse(data);
};
