import { Box, CircularProgress, Container } from '@mui/material';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { GameList, Pagination, usePagination } from '../../../../components';
import { CATEGORY_DEFAULT_VALUES } from './config';
import { CategoryForm } from './components';
import { useFilteredGamesByCategory } from './hooks';
import { CategoryFilters } from './types';

export const CategoryTab = () => {
  const methods = useForm<CategoryFilters>({
    defaultValues: CATEGORY_DEFAULT_VALUES,
  });
  const filters = methods.watch();
  const ref = useRef<HTMLDivElement>(null);

  const { gameFilteredList, categoryOptions, mechanicsOptions, loading } = useFilteredGamesByCategory({ filters });
  const { currentPageGameList, ...paginationProps } = usePagination({ gameFilteredList, ref });

  return (
    <FormProvider {...methods}>
      <Box component="form">
        <CategoryForm categoryOptions={categoryOptions} mechanicsOptions={mechanicsOptions} />
        <Container>
          {loading ? (
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