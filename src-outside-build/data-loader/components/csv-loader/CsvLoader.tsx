import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';
import { dataCsv } from '../../../../src/data';
import { updateGameList } from '../../../../src/shared/firebase';
import { getGameFromCsv, mergeNotesToCsvGame } from './utils';

export const CsvLoader = () => {
  const gameList = useMemo(() => mergeNotesToCsvGame(dataCsv).map(getGameFromCsv), [dataCsv]);

  const handleSaveGameList = () => {
    if (!gameList?.length) {
      return;
    }
    updateGameList(gameList);
  };

  return (
    <>
      <Box my={4}>
        <Typography variant="h2" gutterBottom>
          Načtení dat z CSV souboru
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Seznam her z CSV obsahuje {gameList?.length || 0} položek.
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={4} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>uid</TableCell>
              <TableCell>sourceName</TableCell>
              <TableCell>notes</TableCell>
              <TableCell>langs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameList?.map(({ uid, sourceName, notes, langs }) => (
              <TableRow key={uid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="td" scope="row">
                  {uid}
                </TableCell>
                <TableCell component="td" scope="row">
                  {sourceName}
                </TableCell>
                <TableCell component="td" scope="row">
                  {notes?.map((item) => (
                    <Typography key={item}>{item}</Typography>
                  ))}
                </TableCell>
                <TableCell component="td" scope="row">
                  {langs?.map((item) => (
                    <Typography key={item}>{item}</Typography>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" gap={2} my={4}>
        <Button variant="contained" color="error" onClick={handleSaveGameList}>
          Uložit data do DB
        </Button>
      </Stack>
    </>
  );
};
