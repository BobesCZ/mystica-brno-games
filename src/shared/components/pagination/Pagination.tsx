import { Button, Pagination as MuiPagination, Stack } from '@mui/material';
import { PAGINATION_ITEMS_COUNT } from './config';
import { UsePaginationReturn } from './hooks';

type Props = Omit<UsePaginationReturn, 'currentPageGameList'>;

export const Pagination = ({
  showPagination,
  currentPage,
  pageCount,
  handlePageChange,
  showMoreButton,
  handleMoreButton,
}: Props) => (
  <Stack alignItems="center" gap={3} mb={4}>
    {showMoreButton && (
      <Button variant="contained" size="large" onClick={handleMoreButton}>
        Načíst dalších {PAGINATION_ITEMS_COUNT} her
      </Button>
    )}
    {showPagination && (
      <MuiPagination size="large" count={pageCount} page={currentPage} onChange={handlePageChange} siblingCount={0} />
    )}
  </Stack>
);
