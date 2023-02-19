import { Theme } from '@mui/material';
import { LogRecordState } from '../../../../src/shared/types';

export const getRowColor = (theme: Theme, status: LogRecordState) => {
  const mapColors = {
    [LogRecordState.SUCCESS]: theme.palette.success.dark,
    [LogRecordState.SKIPPED]: theme.palette.action.disabled,
    [LogRecordState.ERROR]: theme.palette.error.main,
  };

  return mapColors[status];
};
