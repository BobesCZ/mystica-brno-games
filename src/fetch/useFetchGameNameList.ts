import { ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useList } from 'react-firebase-hooks/database';

import { firebaseDb } from './firebase';
import { resolveFetchedDataList } from './utils';

type UseFetchGameNameListReturn = {
  gameNameList?: string[];
};

export const useFetchGameNameList = (): UseFetchGameNameListReturn => {
  const [gameNameList, setGameNameList] = useState<string[]>();

  const [gameNameListSource, loading] = useList(ref(firebaseDb, 'gameNameList'));

  useEffect(() => {
    if (!loading && gameNameListSource?.length) {
      const gameNameList: string[] = resolveFetchedDataList<string>(gameNameListSource);

      setGameNameList(gameNameList);
    }
  }, [loading, gameNameListSource]);

  return { gameNameList };
};
