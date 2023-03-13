import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { GameList } from '../../../../src/shared/components';
import { useFetchGameList, updateGameList } from '../../../../src/shared/firebase';
import { Game, LogRecord } from '../../../../src/shared/types';
import { Log, StatusOverview, UnfinishedOverview } from '..';
import { GAME_LIST_SLICE } from '../../config';
import { processGameList } from '../../utils';

export const BggLoader = () => {
  const { gameList } = useFetchGameList();

  const [newGameList, setNewGameList] = useState<Game[]>([]);
  const [log, setLog] = useState<LogRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const processingCount = log.length;
  const processGoalCount = GAME_LIST_SLICE[1] - GAME_LIST_SLICE[0];

  const handleLoad = async () => {
    if (!gameList.length) {
      return;
    }

    setNewGameList([]);
    setLog([]);
    setIsLoading(true);

    await processGameList(gameList.slice(...GAME_LIST_SLICE), setNewGameList, setLog);

    setIsLoading(false);
  };

  const handleSave = () => {
    newGameList.length && updateGameList(newGameList);
  };

  return (
    <>
      <Box my={4}>
        <Typography variant="h2" gutterBottom>
          Doplnění dat z BGG
        </Typography>

        <StatusOverview gameList={gameList} />
        <UnfinishedOverview gameList={gameList} />

        <Box sx={{ display: 'inline-block', position: 'relative' }}>
          <Button variant="contained" color="success" onClick={handleLoad} disabled={isLoading}>
            Načíst BGG pro hry {GAME_LIST_SLICE[0]}-{GAME_LIST_SLICE[1]}
          </Button>
          {isLoading && (
            <LinearProgress
              value={(processingCount / processGoalCount) * 100}
              variant="determinate"
              color="success"
              sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          )}
        </Box>
        {isLoading && (
          <Typography color="text.secondary" sx={{ display: 'inline-block', ml: 2 }}>
            {processingCount} / {processGoalCount}
          </Typography>
        )}
      </Box>

      <Log log={log} />

      {!!newGameList.length && !isLoading && (
        <Button variant="contained" color="error" onClick={handleSave}>
          Uložit data do DB
        </Button>
      )}

      <GameList gameList={newGameList} gameTotalCount={newGameList?.length} />
    </>
  );
};
