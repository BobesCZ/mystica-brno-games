import { Box, CircularProgress, Typography } from '@mui/material';
import { GameDetail } from '../../components';
import { useFetchGameList } from '../../fetch';

export const GameList = () => {
  const { gameList, loading } = useFetchGameList();

  return (
    <>
      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          Seznam her
        </Typography>
      </Box>

      {loading && (
        <Box height={600} display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {!loading && gameList?.map((game) => <GameDetail key={game.id} game={game} />)}
    </>
  );
};
