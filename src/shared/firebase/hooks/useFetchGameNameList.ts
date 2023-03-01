import { useEffect, useState } from 'react';
import { useList } from 'react-firebase-hooks/database';
import { GAME_NAME_LIST_REF } from '../config';

import { resolveFetchedDataList } from './utils';

type Return = {
  gameNameList?: string[];
};

export const useFetchGameNameList = (): Return => {
  const [gameNameList, setGameNameList] = useState<string[]>();

  const [gameNameListSource, loading] = useList(GAME_NAME_LIST_REF);

  useEffect(() => {
    if (!loading && gameNameListSource?.length) {
      const gameNameList: string[] = resolveFetchedDataList<string>(gameNameListSource);

      setGameNameList(gameNameList);
    }
  }, [loading, gameNameListSource]);

  return { gameNameList };
};
