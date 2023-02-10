import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { saveGameNameList } from '../../../fetch';
import { getExternalNameList } from '../utils';

export const MysticaLoader = () => {
  const [gameNameListExternal, setGameNameListExternal] = useState<string[]>();

  const handleLoadGameNameListExternal = () => {
    const newGameList = getExternalNameList();
    setGameNameListExternal(newGameList);
  };

  const handleSaveGameNameListExternal = () => {
    if (!gameNameListExternal?.length) {
      return;
    }

    saveGameNameList(gameNameListExternal);
  };

  return (
    <>
      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          Načtení dat z Mysticy
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          Seznam her obsahuje {gameNameListExternal?.length || 0} položek.
        </Typography>
        <Stack direction="row" gap={2}>
          <Button variant="contained" onClick={handleLoadGameNameListExternal}>
            Načíst data z Mysticy
          </Button>
          {gameNameListExternal && (
            <Button variant="contained" color="error" onClick={handleSaveGameNameListExternal}>
              Uložit data do DB
            </Button>
          )}
        </Stack>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 4, maxHeight: '500px', overflow: 'auto' }}>
        <Table>
          <TableBody>
            {gameNameListExternal?.map((gameName) => (
              <TableRow key={gameName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="td" scope="row">
                  {gameName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
