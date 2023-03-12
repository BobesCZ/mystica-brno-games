import { Game, LogRecord, LogRecordState, Status } from '../../../src/shared/types';
import { PROCESS_GAME_TIMEOUT } from '../config';
import { getGameFromBggThing } from './parseUtils';
import { fetchThingData } from './fetchUtils';
import { getBggId } from './processSearch';
import { Dispatch, SetStateAction } from 'react';

export const processGameList = async (
  gameList: Game[],
  setGameList: Dispatch<SetStateAction<Game[]>>,
  setLog: Dispatch<SetStateAction<LogRecord[]>>,
) => {
  for (const game of gameList) {
    const { sourceName, status } = game;

    try {
      if (status === Status.FINISHED) {
        setLog((prev) => [...prev, { sourceName, status: LogRecordState.SKIPPED }]);
      } else {
        const bggId = await getBggId(sourceName);
        const bggThing = await fetchThingData(bggId);

        const parsedGame = getGameFromBggThing(game, bggThing);

        setGameList((prev) => [...prev, { ...parsedGame, status: Status.FINISHED }]);
        setLog((prev) => [...prev, { sourceName, status: LogRecordState.SUCCESS }]);

        // Slow iteration because of API request limit
        await new Promise((resolve) => setTimeout(resolve, PROCESS_GAME_TIMEOUT));
      }
    } catch (error) {
      console.error(error, sourceName);
      setGameList((prev) => [...prev, { ...game, status: Status.UNFINISHED }]);
      setLog((prev) => [...prev, { sourceName, status: LogRecordState.ERROR }]);
    }
  }
};
