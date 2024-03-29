import {
  Alert,
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
import { updateGameList, useFetchGameList } from '../../../../src/shared/firebase';
import { getGameFromCsv, getGameListDeletedByDiff, getGameListMergedByDiff, mergeNotesToCsvGame } from './utils';

export const CsvLoader = () => {
  const { gameList } = useFetchGameList();
  const csvGameList = useMemo(() => mergeNotesToCsvGame(dataCsv).map(getGameFromCsv), [dataCsv]);
  const mergedGameList = useMemo(() => getGameListMergedByDiff(csvGameList, gameList), [csvGameList, gameList]);
  const removedGameList = useMemo(() => getGameListDeletedByDiff(csvGameList, gameList), [csvGameList, gameList]);

  const handleSaveGameList = () => {
    if (!mergedGameList?.length) {
      return;
    }
    updateGameList(mergedGameList);
  };

  return (
    <>
      <Box my={4}>
        <Typography variant="h2" gutterBottom>
          Načtení dat z CSV souboru
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Seznam her z CSV obsahuje {csvGameList?.length || 0} položek.
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
            {csvGameList?.map(({ uid, sourceName, notes, langs }) => (
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

      <Typography variant="h2" gutterBottom>
        Změny oproti DB
      </Typography>

      {gameList.length === csvGameList.length && (
        <Alert severity="success">V DB i v CSV je {gameList.length} položek</Alert>
      )}

      {(!!mergedGameList.length || !!removedGameList.length) && (
        <TableContainer component={Paper} elevation={4} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>DB uid</TableCell>
                <TableCell>status</TableCell>
                <TableCell>DB sourceName</TableCell>
                <TableCell>BggId</TableCell>
                <TableCell>notes</TableCell>
                <TableCell>langs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mergedGameList.map(({ uid, id, sourceName, notes, langs, status }) => (
                <TableRow key={uid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="td" scope="row">
                    {uid}
                  </TableCell>
                  <TableCell component="td" scope="row">
                    {status.toUpperCase()}
                  </TableCell>
                  <TableCell component="td" scope="row">
                    {sourceName}
                  </TableCell>
                  <TableCell component="td" scope="row">
                    {id}
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
              {removedGameList.map(({ uid, sourceName }) => (
                <TableRow key={uid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="td" scope="row">
                    {uid}
                  </TableCell>
                  <TableCell component="td" scope="row">
                    MISSING IN DB
                  </TableCell>
                  <TableCell component="td" scope="row">
                    {sourceName}
                  </TableCell>
                  <TableCell component="td" scope="row"></TableCell>
                  <TableCell component="td" scope="row"></TableCell>
                  <TableCell component="td" scope="row"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!!mergedGameList.length && (
        <Stack direction="row" gap={2} my={4}>
          <Button variant="contained" color="error" onClick={handleSaveGameList}>
            Uložit data do DB
          </Button>
        </Stack>
      )}
    </>
  );
};
