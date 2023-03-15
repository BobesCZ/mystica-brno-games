import { Box, CircularProgress, Container } from '@mui/material';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RANK_DEFAULT_VALUES } from './config';
import { RankForm } from './components';
import { RankFilters } from './types';
import { useFilteredGamesByRank } from './hooks';
import { GameList, Pagination, usePagination } from '../../../shared/components';

export const Rank = () => {
  const methods = useForm<RankFilters>({
    defaultValues: RANK_DEFAULT_VALUES,
  });
  const filters = methods.watch();
  const ref = useRef<HTMLDivElement>(null);

  const { gameFilteredList, gameListLoading, ...options } = useFilteredGamesByRank({
    filters,
  });
  const { currentPageGameList, ...paginationProps } = usePagination({ gameFilteredList, ref });

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit((_, e) => e?.preventDefault())}>
        <RankForm {...options} />
        <Container>
          {gameListLoading ? (
            <Box height={600} display="flex" alignItems="center" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Box ref={ref}>
              <GameList gameList={currentPageGameList} gameTotalCount={gameFilteredList.length} />
              <Pagination {...paginationProps} />
            </Box>
          )}
        </Container>
      </Box>
    </FormProvider>
  );
};
