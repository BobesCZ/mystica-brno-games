import { KeyboardArrowDown, KeyboardArrowUp, Launch } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Link,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Game } from '../../types';
import { PlayersCountString, RankTag } from './components';
import { MAX_RANK_LIMIT } from './config';

type Props = {
  game: Game;
};

export const GameCard = ({
  game: {
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
    averageRating,
    averageWeight,
    ranks,
  },
}: Props) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const filteredRanks = ranks.filter(({ value }) => value <= MAX_RANK_LIMIT);

  return (
    <Card
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 1 }}
      elevation={3}
      data-id={id}
    >
      <CardContent>
        <Box position="relative">
          <CardMedia component="img" image={image} alt="" sx={{ objectFit: 'contain', height: 250, mb: 3 }} />

          {filteredRanks.length > 0 && (
            <Stack
              alignItems="flex-start"
              gap={1}
              sx={(theme) => ({ position: 'absolute', top: theme.spacing(-1.5), left: theme.spacing(-1.5) })}
            >
              {filteredRanks.map((rank) => (
                <RankTag key={rank.name} rank={rank} />
              ))}
            </Stack>
          )}
        </Box>

        <Typography variant="h3" sx={{ mb: 0.25 }}>
          {sourceName}{' '}
          <Typography variant="h3" component="span" color="text.secondary">
            ({yearpublished})
          </Typography>
        </Typography>

        <Stack
          display="inline-flex"
          direction="row"
          alignItems="center"
          gap={1}
          mb={2}
          title={t('gameCard.usersCount', { usersCount: averageRating.usersCount })}
        >
          <Rating size="small" value={averageRating.value / 2} max={5} precision={0.1} readOnly />
          {averageRating.value > 0 && (
            <Typography variant="subtitle2" component="span" sx={{ mt: 0.25, lineHeight: 1, color: grey[500] }}>
              {(averageRating.value * 10).toFixed(0)}%
            </Typography>
          )}
        </Stack>

        <Typography variant="body1" color="text.secondary">
          {minplayers > 0 && <PlayersCountString minplayers={minplayers} maxplayers={maxplayers} />}
          {minplayers > 0 && playingtime > 0 && <>, </>}
          {playingtime > 0 && <Trans t={t} i18nKey="gameCard.playingtime" values={{ playingtime }} />}
        </Typography>

        <Stack direction="row" mt={2} gap={1} flexWrap="wrap">
          {categories.map((item) => (
            <Chip key={item} label={t(`bgg.categories.${item}`)} />
          ))}
        </Stack>

        <Collapse in={expanded}>
          <Box mt={3}>
            <Link
              display="inline-block"
              variant="h4"
              color="text.secondary"
              href={`https://boardgamegeek.com/boardgame/${id}`}
              target="_blank"
              title={t('gameCard.goToBgg') ?? ''}
            >
              <Stack direction="row" alignItems="center" mb={1.5} gap={1}>
                {primaryName}
                <Launch fontSize="small" />
              </Stack>
            </Link>

            <Stack>
              {averageWeight.value > 0 && (
                <Typography
                  display="inline-block"
                  variant="body1"
                  color="text.secondary"
                  title={t('gameCard.usersCount', { usersCount: averageWeight.usersCount })}
                >
                  <Trans t={t} i18nKey="gameCard.weight" values={{ weight: averageWeight.value.toFixed(1) }} />
                </Typography>
              )}

              {minage > 0 && (
                <Typography variant="body1" color="text.secondary">
                  <Trans t={t} i18nKey="gameCard.minage" values={{ minage }} />
                </Typography>
              )}
            </Stack>

            <Stack direction="row" mt={2} gap={1} flexWrap="wrap">
              {mechanics.map((item) => (
                <Chip variant="outlined" key={item} label={t(`bgg.mechanics.${item}`)} />
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
              <Trans t={t} i18nKey="common.showLess" />
              <KeyboardArrowUp fontSize="small" />
            </>
          ) : (
            <>
              <Trans t={t} i18nKey="common.showMore" />
              <KeyboardArrowDown fontSize="small" />
            </>
          )}
        </Link>
      </CardActions>
    </Card>
  );
};
