import { ChangeEvent } from 'react';
import { Game } from '../../../../types';

export type UsePaginationReturn = {
  currentPageGameList: Game[];
  showPagination: boolean;
  currentPage: number;
  pageCount: number;
  handlePageChange: (event: ChangeEvent<unknown>, value: number) => void;
  showMoreButton: boolean;
  handleMoreButton: () => void;
};
