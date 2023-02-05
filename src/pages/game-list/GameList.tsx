import { Alert, AlertTitle, Box, CircularProgress, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { GameDetail } from '../../components';
import { useFetchGameList } from '../../fetch';
import { Filters } from '../../types';
import { GameListForm } from './components';
import { FILTER_DEFAULT_VALUES } from './config';
import { useFilteredGames } from './useFetchGameNameList';

export const GameList = () => {
  const { gameList, loading } = useFetchGameList();
  const methods = useForm<Filters>({
    defaultValues: FILTER_DEFAULT_VALUES,
  });
  const filters = methods.watch();

  const { gameFilteredList, categoryOptions, mechanicsOptions } = useFilteredGames({ gameList, filters });

  return (
    <>
      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          Nevíte, co hrát?
        </Typography>
      </Box>

      {loading ? (
        <Box height={600} display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <FormProvider {...methods}>
          <Box component="form">
            <GameListForm categoryOptions={categoryOptions} mechanicsOptions={mechanicsOptions} />

            <Box my={4}>
              <Typography variant="h4">Vyhledané hry</Typography>
            </Box>

            {gameFilteredList.length ? (
              <>
                {gameFilteredList.map((game) => (
                  <GameDetail key={game.id} game={game} />
                ))}
              </>
            ) : (
              <Alert variant="outlined" severity="info">
                <AlertTitle>Nenalezeny žádné hry</AlertTitle>
                Zkuste změnit parametry vyhledávání.
              </Alert>
            )}
          </Box>
        </FormProvider>
      )}
    </>
  );
};
