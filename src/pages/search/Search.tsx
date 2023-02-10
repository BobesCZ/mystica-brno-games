import { Alert, AlertTitle, Box, CircularProgress, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { GameCard, GameList } from '../../components';
import { useFetchGameList } from '../../fetch';
import { Filters } from '../../types';
import { SearchForm } from './components';
import { FILTER_DEFAULT_VALUES } from './config';
import { useFilteredGames } from './useFilteredGames';

export const Search = () => {
  const { gameList, loading } = useFetchGameList();
  const methods = useForm<Filters>({
    defaultValues: FILTER_DEFAULT_VALUES,
  });
  const filters = methods.watch();

  const { gameFilteredList, categoryOptions, mechanicsOptions } = useFilteredGames({ gameList, filters });

  return (
    <>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
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
            <SearchForm categoryOptions={categoryOptions} mechanicsOptions={mechanicsOptions} />

            <GameList gameList={gameFilteredList} />
          </Box>
        </FormProvider>
      )}
    </>
  );
};
