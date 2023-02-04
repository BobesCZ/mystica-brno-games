import { Launch } from '@mui/icons-material';
import { Card, CardContent, CardMedia, Chip, Grid, Link, Stack, Typography } from '@mui/material';
import { Game } from '../../types';

interface GameDetailProps {
  game: Game;
}

const GameDetail = ({ game }: GameDetailProps) => {
  const {
    sourceName,
    id,
    primaryName,
    image,
    yearpublished,
    playingtime,
    minplayers,
    maxplayers,
    minage,
    categories,
    mechanics,
  } = game;

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item width={160}>
            <CardMedia width={160} height={160} component="img" image={image} alt="" />
          </Grid>

          <Grid item flexGrow={1}>
            <Typography variant="h5" gutterBottom>
              {sourceName} ({yearpublished})
            </Typography>

            <Stack direction="row" mb={2} gap={0.5}>
              {categories.map((item) => (
                <Chip key={item} label={item} size="small" />
              ))}
            </Stack>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              Herní doba: {playingtime} min
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              Počet hráčů: {minplayers} - {maxplayers}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              Doporučený věk: od {minage} let
            </Typography>
          </Grid>
          <Grid item width="40%">
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
            <Stack direction="row" flexWrap="wrap" mb={2} gap={1}>
              {mechanics.map((item) => (
                <Chip key={item} label={item} size="small" variant="outlined" />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GameDetail;
