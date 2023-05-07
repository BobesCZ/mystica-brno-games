import { Box, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Rating } from '../../../../types';
import { Bookmark } from '@mui/icons-material';
import { getIconColor } from './utils';

type Props = {
  averageWeight: Rating;
};

export const GameWeight = ({ averageWeight }: Props) => {
  const { t } = useTranslation();

  return (
    <Tooltip arrow enterTouchDelay={100} title={t('gameCard.weight')}>
      <Box
        sx={(theme) => ({
          position: 'absolute',
          top: theme.spacing(-2.75),
          right: theme.spacing(-3.25),
          display: 'flex',
        })}
      >
        <Bookmark
          sx={(theme) => ({
            fontSize: 64,
            color: getIconColor(averageWeight, theme),
            filter: `drop-shadow(0px 4px 2px rgba(0,0,0,0.2))`,
          })}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" component="div" color="white">
            {averageWeight.value.toFixed(1)}
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};