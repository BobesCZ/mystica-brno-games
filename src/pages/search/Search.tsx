import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { GameList } from '../../components';
import { Filters } from '../../types';
import { SearchForm, SearchPagination } from './components';
import { FILTER_DEFAULT_VALUES } from './config';
import { useFilteredGames } from './useFilteredGames';
import { usePagination } from './usePagination';

export const Search = () => {
  const methods = useForm<Filters>({
    defaultValues: FILTER_DEFAULT_VALUES,
  });
  const filters = methods.watch();
  const ref = useRef<HTMLDivElement>(null);

  const { gameFilteredList, categoryOptions, mechanicsOptions, loading } = useFilteredGames({ filters });
  const { currentPageGameList, ...paginationProps } = usePagination({ gameFilteredList, ref });

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
          <SearchForm categoryOptions={categoryOptions} mechanicsOptions={mechanicsOptions} />
          <Container>
            {loading ? (
              <Box height={600} display="flex" alignItems="center" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <Box ref={ref}>
                <GameList gameList={currentPageGameList} gameTotalCount={gameFilteredList.length} />
                <SearchPagination {...paginationProps} />
              </Box>
            )}
          </Container>
        </Box>
      </FormProvider>
    </>
  );
};
