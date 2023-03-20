import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Game, Status } from '../../../../src/shared/types';

type Props = {
  gameList?: Game[];
};

export const UnfinishedOverview = ({ gameList }: Props) => {
  const unfinishedGameList = useMemo(() => gameList?.filter((game) => game.status === Status.UNFINISHED), [gameList]);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Nenalezeno {unfinishedGameList?.length} her
      </Typography>
      {unfinishedGameList?.length && (
        <TableContainer component={Paper} elevation={4} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Název hry</TableCell>
                <TableCell>Chyba</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unfinishedGameList?.map(({ sourceName, statusMessage }, index) => (
                <TableRow key={`${sourceName}_${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="td" scope="row">
                    {sourceName}
                  </TableCell>
                  <TableCell component="td" scope="row">
                    {statusMessage}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
