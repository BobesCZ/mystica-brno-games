import { ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useList } from 'react-firebase-hooks/database';
import { Game } from '../types';

import { firebaseDb } from './firebase';
import { resolveFetchedDataList } from './utils';

type UseFetchGameListReturn = {
  gameList?: Game[];
  loading: boolean;
};

export const useFetchGameList = (): UseFetchGameListReturn => {
  const [gameList, setGameList] = useState<Game[]>();

  const [gameListSource, loading] = useList(ref(firebaseDb, 'gameList'));

  useEffect(() => {
    if (!loading && gameListSource?.length) {
      const gameList = resolveFetchedDataList<Game>(gameListSource);
      const parsedGameList = gameList.map((game) => ({
        ...game,
        categories: game?.categories || [],
        mechanics: game?.mechanics || [],
      }));

      setGameList(parsedGameList);
    }
  }, [loading, gameListSource]);

  return { gameList, loading };
};
