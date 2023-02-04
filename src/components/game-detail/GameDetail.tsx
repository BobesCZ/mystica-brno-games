import { useEffect, useState } from 'react';
import axios from 'axios';
import { BggThing } from '@code-bucket/board-game-geek';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { parseBggXmlApi2ThingResponse } from '../../board-game-geek-fixed';

const useThing = () => {
  const [thing, setThing] = useState<BggThing>();

  const getThing = async () => {
    const response = await axios.get("https://api.geekdo.com/xmlapi2/thing?id=170416&versions=1'");
    const bggResponse = parseBggXmlApi2ThingResponse(response);

    const thing = bggResponse?.item;
    setThing(thing);
  };

  useEffect(() => {
    getThing();
  }, []);

  return thing;
};

const GameDetail = () => {
  const game = useThing();
  console.log('thing', game);

  if (!game) {
    return null;
  }

  const { primaryName, image, yearpublished } = game;

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <CardMedia width={160} height={160} component="img" image={image} alt="" />
          </Grid>

          <Grid item>
            <Typography variant="h5" gutterBottom>
              {primaryName} ({yearpublished})
            </Typography>

            {game?.playingtime && (
              <Typography variant="body2" color="text.secondary">
                Playing Time: {game?.playingtime} min
              </Typography>
            )}
            {game?.minplayers && (
              <Typography variant="body2" color="text.secondary">
                Players: {game?.minplayers}
              </Typography>
            )}
            {game?.maxplayers && (
              <Typography variant="body2" color="text.secondary">
                Players: {game?.maxplayers}
              </Typography>
            )}
            {game?.minage && (
              <Typography variant="body2" color="text.secondary">
                Age: {game?.minage}+
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GameDetail;
