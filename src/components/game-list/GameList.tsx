import { Alert, AlertTitle, Box, Typography } from '@mui/material';
import { GameCard } from '../../components';
import { Game } from '../../types';

interface GameListProps {
  gameList?: Game[];
}

export const GameList = ({ gameList }: GameListProps) => {
  return (
    <Box py={4}>
      <Box mt={2} mb={4}>
        <Typography variant="h4" textAlign="center">
          Vyhledané hry{' '}
          <Typography variant="h4" component="span" color="text.secondary">
            ({gameList?.length})
          </Typography>
        </Typography>
      </Box>

      {gameList?.length ? (
        <Box
          sx={(theme) => ({
            display: 'grid',
            gap: 3,
            gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
            [theme.breakpoints.up('md')]: {
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            },
            [theme.breakpoints.up('lg')]: {
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            },
          })}
        >
          {gameList.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </Box>
      ) : (
        <Alert variant="outlined" severity="info">
          <AlertTitle>Nenalezeny žádné hry</AlertTitle>
          Zkuste změnit parametry vyhledávání.
        </Alert>
      )}
    </Box>
  );
};
