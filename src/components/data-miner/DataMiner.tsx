import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { Game } from '../../types';
import GameDetail from '../game-detail/GameDetail';
import { loadAllGames } from './utils';

const DataMiner = () => {
  const games = ['Duchové ostrova', 'Galaxy Trucker', 'Safari Bar'];
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Game[]>();

  const handleLoad = async () => {
    setIsLoading(true);

    const gamesData = await loadAllGames(games);
    setData(gamesData);

    setIsLoading(false);
  };

  return (
    <>
      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          Seznam her
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Seznam her obsahuje {games.length} položek.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          Načtení dat
        </Typography>
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
      </Box>
      {data?.map((game) => (
        <GameDetail key={game.id} game={game} />
      ))}
    </>
  );
};

export default DataMiner;
