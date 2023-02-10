import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Theme, Typography } from '@mui/material';
import { LogRecord, LogRecordState } from '../../../types';

type LogProps = {
  log?: LogRecord[];
};

const getRowColor = (theme: Theme, status: LogRecordState) => {
  const mapColors = {
    [LogRecordState.SUCCESS]: theme.palette.success.dark,
    [LogRecordState.SKIPPED]: theme.palette.action.disabled,
    [LogRecordState.ERROR]: theme.palette.error.main,
  };

  return mapColors[status];
};

export const Log = ({ log }: LogProps) => {
  const errorCount = (log || []).filter(({ status }) => status === LogRecordState.ERROR).length;
  const skippedCount = (log || []).filter(({ status }) => status === LogRecordState.SKIPPED).length;

  return (
    <>
      <Typography variant="h5" color={(theme) => theme.palette.error.main} gutterBottom>
        Nenačtené položky {log?.length && `(${errorCount} + ${skippedCount})`}
      </Typography>
      <TableContainer component={Paper} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
        <Table>
          <TableBody>
            {log?.map(({ sourceName, status }, index) => (
              <TableRow key={sourceName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="td" scope="row" sx={(theme) => ({ color: getRowColor(theme, status) })}>
                  {index + 1}
                </TableCell>
                <TableCell component="td" scope="row" sx={(theme) => ({ color: getRowColor(theme, status) })}>
                  {sourceName}
                </TableCell>
                <TableCell component="td" scope="row" sx={(theme) => ({ color: getRowColor(theme, status) })}>
                  {status.toUpperCase()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
