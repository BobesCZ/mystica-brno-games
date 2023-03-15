import { Button, Pagination as MuiPagination, Stack } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
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
}: Props) => {
  const { t } = useTranslation();

  return showMoreButton || showPagination ? (
    <Stack alignItems="center" gap={3} mb={4}>
      {showMoreButton && (
        <Button variant="contained" size="large" onClick={handleMoreButton}>
          <Trans t={t} i18nKey="pagination.showMore" values={{ itemsCount: PAGINATION_ITEMS_COUNT }} />
        </Button>
      )}
      {showPagination && (
        <MuiPagination
          size="large"
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          siblingCount={0}
          sx={{
            '.MuiPaginationItem-root': {
              lineHeight: 1,
            },
          }}
        />
      )}
    </Stack>
  ) : null;
};
