import { KeyboardArrowDown, KeyboardArrowUp, Launch } from '@mui/icons-material';
import { Box, Card, CardActions, CardContent, CardMedia, Chip, Collapse, Link, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Game } from '../../types';

type Props = {
  game: Game;
};

export const GameCard = ({
  game: {
    sourceName,
    id,
    primaryName,
    image,
    description,
    yearpublished,
    playingtime,
    minplayers,
    maxplayers,
    minage,
    categories,
    mechanics,
  },
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 1 }}
      elevation={3}
      data-id={id}
    >
      <CardContent>
        <Box position="relative">
          <CardMedia component="img" image={image} alt="" sx={{ objectFit: 'contain', height: 250, mb: 3 }} />
        </Box>

        <Typography variant="h5" gutterBottom>
          {sourceName}{' '}
          <Typography variant="h5" component="span" color="text.secondary">
            ({yearpublished})
          </Typography>
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Herní doba: {playingtime} min
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Počet hráčů: {minplayers} - {maxplayers}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Doporučený věk: od {minage} let
        </Typography>

        <Stack direction="row" mt={2} gap={1} flexWrap="wrap">
          {categories.map((item) => (
            <Chip key={item} label={item} />
          ))}
        </Stack>

        <Collapse in={expanded}>
          <Box mt={2}>
            <Link
              display="inline-block"
              variant="h6"
              color="text.secondary"
              href={`https://boardgamegeek.com/boardgame/${id}`}
              target="_blank"
              title="Přejít na BoardGameGeek.com"
            >
              <Stack direction="row" alignItems="center" mb={1} gap={1}>
                {primaryName}
                <Launch fontSize="small" />
              </Stack>
            </Link>

            <Typography variant="body2">{description}</Typography>

            <Stack direction="row" mt={2} gap={1} flexWrap="wrap">
              {mechanics.map((item) => (
                <Chip key={item} label={item} variant="outlined" />
              ))}
            </Stack>
          </Box>
        </Collapse>
      </CardContent>
      <CardActions>
        <Link
          component="button"
          variant="body2"
          onClick={(e) => {
            e.preventDefault();
            setExpanded((prev) => !prev);
          }}
          display="flex"
          underline="hover"
          sx={{ m: 'auto' }}
        >
          {expanded ? (
            <>
              Skrýt <KeyboardArrowUp fontSize="small" />
            </>
          ) : (
            <>
              Více o hře
              <KeyboardArrowDown fontSize="small" />
            </>
          )}
        </Link>
      </CardActions>
    </Card>
  );
};
