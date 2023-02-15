import { Button, Pagination, Stack } from '@mui/material';
import { PAGINATION_ITEMS_COUNT } from '../config';
import { UsePaginationReturn } from '../usePagination';

type PaginationProps = Omit<UsePaginationReturn, 'currentPageGameList'>;

export const SearchPagination = ({
  showPagination,
  currentPage,
  pageCount,
  handlePageChange,
  showMoreButton,
  handleMoreButton,
}: PaginationProps) => {
  return (
    <Stack alignItems="center" gap={3} mb={4}>
      {showMoreButton && (
        <Button variant="contained" size="large" onClick={handleMoreButton}>
          Načíst dalších {PAGINATION_ITEMS_COUNT} her
        </Button>
      )}
      {showPagination && (
        <Pagination size="large" count={pageCount} page={currentPage} onChange={handlePageChange} siblingCount={0} />
      )}
    </Stack>
  );
};
