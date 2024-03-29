import { Box, CircularProgress, Container } from '@mui/material';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CATEGORY_DEFAULT_VALUES } from './config';
import { CategoryForm, OrderingSelect } from './components';
import { useFilteredGamesByCategory } from './hooks';
import { CategoryFilters } from './types';
import { useTranslation } from 'react-i18next';
import { GameList, PageTitle, Pagination, usePagination } from '../../../shared/components';

export const Search = () => {
  const {
    i18n: { resolvedLanguage },
  } = useTranslation();
  const methods = useForm<CategoryFilters>({
    defaultValues: CATEGORY_DEFAULT_VALUES,
  });
  const filters = methods.watch();
  const ref = useRef<HTMLDivElement>(null);

  const { gameFilteredList, gameListLoading, orderingOptions, ...options } = useFilteredGamesByCategory({
    filters,
    resolvedLanguage,
  });
  const { currentPageGameList, ...paginationProps } = usePagination({ gameFilteredList, ref });

  return (
    <>
      <PageTitle i18nKey="search.pageTitle" dense />
      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit((_, e) => e?.preventDefault())}>
          <CategoryForm {...options} />
          <Container>
            {gameListLoading ? (
              <Box height={600} display="flex" alignItems="center" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <Box ref={ref}>
                <OrderingSelect orderingOptions={orderingOptions} />
                <GameList gameList={currentPageGameList} gameTotalCount={gameFilteredList.length} />
                <Pagination {...paginationProps} />
              </Box>
            )}
          </Container>
        </Box>
      </FormProvider>
    </>
  );
};
