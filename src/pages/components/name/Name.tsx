import { Box, CircularProgress, Container } from '@mui/material';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { GameList, PageTitle, Pagination, usePagination } from '../../../shared/components';
import { NAME_DEFAULT_VALUES } from './config';
import { NameFilters } from './types';
import { useFilteredGamesByName } from './hooks';
import { NameForm } from './components';

export const Name = () => {
  const methods = useForm<NameFilters>({
    defaultValues: NAME_DEFAULT_VALUES,
  });
  const filters = methods.watch();
  const ref = useRef<HTMLDivElement>(null);

  const { gameFilteredList, gameListLoading } = useFilteredGamesByName({ filters });
  const { currentPageGameList, ...paginationProps } = usePagination({ gameFilteredList, ref });

  return (
    <>
      <PageTitle i18nKey="name.pageTitle" dense />
      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit((_, e) => e?.preventDefault())}>
          <NameForm />
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
    </>
  );
};
