import { Box, CircularProgress, Container } from '@mui/material';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { GameList, Pagination, usePagination } from '../../../../components';
import { NameForm } from './components';
import { NAME_DEFAULT_VALUES } from './config';
import { NameFilters } from './types';
import { useFilteredGamesByName } from './hooks';

export const NameTab = () => {
  const methods = useForm<NameFilters>({
    defaultValues: NAME_DEFAULT_VALUES,
  });
  const filters = methods.watch();
  const ref = useRef<HTMLDivElement>(null);

  const { gameFilteredList, gameListOptions, loading } = useFilteredGamesByName({ filters });
  const { currentPageGameList, ...paginationProps } = usePagination({ gameFilteredList, ref });

  return (
    <FormProvider {...methods}>
      <Box component="form">
        <NameForm gameListOptions={gameListOptions} />
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
