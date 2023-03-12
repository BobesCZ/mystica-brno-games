import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useMemo } from 'react';
import { Game, Status } from '../../../../src/shared/types';

type Props = {
  gameList?: Game[];
};

export const StatusOverview = ({ gameList }: Props) => {
  const { newCount, unfinishedCount, finishedCount } = useMemo(
    () => ({
      newCount: gameList?.filter((game) => game.status === Status.NEW).length,
      unfinishedCount: gameList?.filter((game) => game.status === Status.UNFINISHED).length,
      finishedCount: gameList?.filter((game) => game.status === Status.FINISHED).length,
    }),
    [gameList],
  );

  return (
    <TableContainer component={Paper} sx={{ my: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Počet her</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="td" scope="row">
              Čeká na doplnění
            </TableCell>
            <TableCell component="td" scope="row">
              {Status.NEW}
            </TableCell>
            <TableCell component="td" scope="row">
              {newCount}
            </TableCell>
          </TableRow>

          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="td" scope="row">
              Nenalezeno
            </TableCell>
            <TableCell component="td" scope="row">
              {Status.UNFINISHED}
            </TableCell>
            <TableCell component="td" scope="row">
              {unfinishedCount}
            </TableCell>
          </TableRow>

          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="td" scope="row">
              Úspěšně doplněno
            </TableCell>
            <TableCell component="td" scope="row">
              {Status.FINISHED}
            </TableCell>
            <TableCell component="td" scope="row">
              {finishedCount}
            </TableCell>
          </TableRow>

          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="td" scope="row">
              Celkem
            </TableCell>
            <TableCell component="td" scope="row"></TableCell>
            <TableCell component="td" scope="row">
              {gameList?.length}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
