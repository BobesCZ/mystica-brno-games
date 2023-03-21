import { Box, Card, CardActions, CardContent, Chip, Collapse, Rating, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Game, Status } from '../../types';
import { BggLink, CardImage, NoteTag, PlayersCountString, RankTag, ShowMoreToggler, ZhLink } from './components';
import { MAX_RANK_LIMIT } from './config';

type Props = {
  game: Game;
};

export const GameCard = ({
  game: {
    uid,
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
    notes,
    status,
  },
}: Props) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const filteredRanks = (ranks || [])?.filter(({ value }) => value <= MAX_RANK_LIMIT);

  return (
    <Card
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 1 }}
      elevation={3}
      data-uid={uid}
      data-id={id}
    >
      <CardContent>
        <Box position="relative">
          <CardImage image={image} />

          {!!filteredRanks.length && (
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
          {yearpublished && (
            <Typography variant="h3" component="span" color="text.secondary">
              ({yearpublished})
            </Typography>
          )}
        </Typography>

        {!!averageRating?.value && (
          <Box display="flex" mb={2}>
            <Stack
              display="inline-flex"
              direction="row"
              alignItems="center"
              gap={1}
              title={t('gameCard.usersCount', { usersCount: averageRating.usersCount })}
            >
              <Rating size="small" value={averageRating.value / 2} max={5} precision={0.1} readOnly />
              <Typography variant="body2" component="span" sx={{ mt: 0.25, lineHeight: 1, color: grey[500] }}>
                {(averageRating.value * 10).toFixed(0)}%
              </Typography>
            </Stack>
          </Box>
        )}

        <Typography variant="body1" color="text.secondary">
          {!!minplayers && <PlayersCountString minplayers={minplayers} maxplayers={maxplayers} />}
          {!!minplayers && !!playingtime && <>, </>}
          {!!playingtime && <Trans t={t} i18nKey="gameCard.playingtime" values={{ playingtime }} />}
        </Typography>

        {!!categories?.length && (
          <Stack direction="row" mt={2} gap={1} flexWrap="wrap">
            {categories.map((item) => (
              <Chip key={item} label={t(`bgg.categories.${item}`)} />
            ))}
          </Stack>
        )}

        {!!notes?.length && (
          <Stack direction="row" mt={2} gap={1} flexWrap="wrap">
            {notes.map((item) => (
              <NoteTag key={item} note={item} />
            ))}
          </Stack>
        )}

        {status !== Status.FINISHED && (
          <Typography variant="body2" sx={{ mt: 1, color: grey[500] }}>
            <Trans t={t} i18nKey="gameCard.noInfo" />
          </Typography>
        )}

        {status === Status.FINISHED && (
          <Collapse in={expanded}>
            <Box mt={3}>
              <BggLink id={id} primaryName={primaryName} />
              <ZhLink sourceName={sourceName} />

              <Stack>
                {!!averageWeight?.value && (
                  <Typography
                    display="inline-block"
                    variant="body1"
                    color="text.secondary"
                    title={t('gameCard.usersCount', { usersCount: averageWeight.usersCount })}
                  >
                    <Trans t={t} i18nKey="gameCard.weight" values={{ weight: averageWeight.value.toFixed(1) }} />
                  </Typography>
                )}

                {!!minage && (
                  <Typography variant="body1" color="text.secondary">
                    <Trans t={t} i18nKey="gameCard.minage" values={{ minage }} />
                  </Typography>
                )}
              </Stack>

              {!!mechanics?.length && (
                <>
                  <Typography variant="h4" mt={2} mb={1}>
                    <Trans t={t} i18nKey="search.form.mechanics.label" />
                  </Typography>
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {mechanics?.map((item) => (
                      <Chip variant="outlined" key={item} label={t(`bgg.mechanics.${item}`)} />
                    ))}
                  </Stack>
                </>
              )}
            </Box>
          </Collapse>
        )}
      </CardContent>

      {status === Status.FINISHED && (
        <CardActions>
          <ShowMoreToggler expanded={expanded} setExpanded={setExpanded} />
        </CardActions>
      )}
    </Card>
  );
};
