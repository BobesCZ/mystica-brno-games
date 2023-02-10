import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { GameList } from '../../components';
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
      <Box pt={4} sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}>
        <Container>
          <Typography variant="h3" textAlign="center">
            Nevíte, co hrát?
          </Typography>
        </Container>
      </Box>

      <FormProvider {...methods}>
        <Box component="form">
          {loading ? (
            <Box height={600} display="flex" alignItems="center" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <SearchForm categoryOptions={categoryOptions} mechanicsOptions={mechanicsOptions} />
          )}
          <Container>
            <GameList gameList={gameFilteredList} />
          </Container>
        </Box>
      </FormProvider>
    </>
  );
};
