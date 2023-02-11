import { Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { GameList } from '../../components';
import { saveGameList, useFetchGameList, useFetchGameNameList } from '../../fetch';
import { saveFailedGameList } from '../../fetch/saveFailedGameList';
import { Game, LogRecord } from '../../types';
import { Log, MysticaLoader } from './components';
import { GAME_LIST_SLICE } from './config';
import { getGameList } from './utils';

export const DataLoader = () => {
  const { gameNameList } = useFetchGameNameList();
  const { gameList } = useFetchGameList();

  const [tempGameList, setTempGameList] = useState<Game[]>();
  const [failedGameList, setFailedGameList] = useState<string[]>();
  const [log, setLog] = useState<LogRecord[]>();

  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = async () => {
    if (!gameNameList?.length) {
      return;
    }

    setIsLoading(true);

    const {
      newGameList,
      newFailedGameList,
      log: newLog,
    } = await getGameList(gameNameList.slice(...GAME_LIST_SLICE), gameList);

    setTempGameList(newGameList);
    setFailedGameList(newFailedGameList);
    setLog(newLog);
    setIsLoading(false);
  };

  const handleSave = () => {
    tempGameList?.length && saveGameList(tempGameList);
    failedGameList?.length && saveFailedGameList(failedGameList);
  };

  return (
    <Container>
      <MysticaLoader />

      <Box my={4}>
        <Typography variant="h3" gutterBottom>
          Načtení dat z BGG
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          Seznam her v DB obsahuje {gameNameList?.length || 0} položek.
        </Typography>

        <Stack direction="row" gap={2}>
          <Box sx={{ display: 'inline-block', position: 'relative' }}>
            <Button variant="contained" onClick={handleLoad} disabled={isLoading}>
              Načíst data z BGG
            </Button>
            {isLoading && (
              <CircularProgress
                size={20}
                sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-10px', marginLeft: '-10px' }}
              />
            )}
          </Box>

          {tempGameList && (
            <Button variant="contained" color="error" onClick={handleSave}>
              Uložit data do DB
            </Button>
          )}
        </Stack>
      </Box>

      <Log log={log} />

      <Typography variant="h5" color={(theme) => theme.palette.success.main} gutterBottom>
        Úspěšně načteno {tempGameList?.length && `(${tempGameList.length})`}
      </Typography>

      <GameList gameList={tempGameList} />
    </Container>
  );
};
