import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { GameDetail } from '../../components';
import { saveGameList, useFetchGameNameList } from '../../fetch';
import { Game } from '../../types';
import { getGameList } from './utils';

export const DataMiner = () => {
  const [gameList, setGameList] = useState<Game[]>();
  const [isLoading, setIsLoading] = useState(false);

  const { gameNameList } = useFetchGameNameList();

  const handleLoad = async () => {
    if (!gameNameList?.length) {
      return;
    }

    setIsLoading(true);

    const newGameList = await getGameList(gameNameList);

    setGameList(newGameList);
    setIsLoading(false);
  };

  const handleSave = () => {
    if (!gameList?.length) {
      return;
    }

    saveGameList(gameList);
  };

  return (
    <>
      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          Seznam her
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Seznam her obsahuje {gameNameList?.length} položek.
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="h3" gutterBottom>
          Načtení dat
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

          {gameList && (
            <Button variant="contained" color="error" onClick={handleSave}>
              Uložit data
            </Button>
          )}
        </Stack>
      </Box>
      {gameList?.map((game) => (
        <GameDetail key={game.id} game={game} />
      ))}
    </>
  );
};
