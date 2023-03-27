import { useEffect, useMemo, useState } from 'react';
import { useList } from 'react-firebase-hooks/database';
import { Game } from '../../types';
import { GAME_LIST_REF } from '../config';

import { resolveFetchedDataList } from './utils';
import { dataJson } from '../../../data';

type Return = {
  gameList: Game[];
  loading: boolean;
};

const useFetchGameListFirebase = (): Return => {
  const [gameList, setGameList] = useState<Game[]>([]);

  const [gameListSource, loading] = useList(GAME_LIST_REF);

  useEffect(() => {
    if (!loading && gameListSource?.length) {
      const gameList = resolveFetchedDataList<Game>(gameListSource);
      const parsedGameList = gameList.map((game) => ({
        ...game,
        categories: game?.categories || [],
        mechanics: game?.mechanics || [],
        ranks: game?.ranks || [],
      }));

      setGameList(parsedGameList);
    }
  }, [loading, gameListSource]);

  return { gameList, loading };
};

const useFetchGameListLocal = (): Return => {
  const gameList = useMemo(() => {
    const gameListSource: Game[] = Object.values(dataJson.gameList).reduce(
      (result: Game[], game) => [...result, game as Game],
      [],
    );

    return gameListSource.map((game) => ({
      ...game,
      categories: game?.categories || [],
      mechanics: game?.mechanics || [],
      ranks: game?.ranks || [],
    }));
  }, []);

  return { gameList, loading: false };
};

export const useFetchGameList = useFetchGameListLocal;
