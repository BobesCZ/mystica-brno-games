import { Theme } from '@mui/material';
import { GameWeightLevel } from './types';

export const getWeightLevel = (value: number): GameWeightLevel => {
  if (value < 2) {
    return GameWeightLevel.LIGHT;
  }
  if (value < 3) {
    return GameWeightLevel.MEDIUM_HEAVY;
  }
  if (value < 4) {
    return GameWeightLevel.HEAVY;
  }

  return GameWeightLevel.HARDCORE;
};

export const getColorByWeightLevel = (level: GameWeightLevel, theme: Theme) => {
  const colors: Record<GameWeightLevel, string> = {
    [GameWeightLevel.LIGHT]: theme.palette.success.light,
    [GameWeightLevel.MEDIUM_HEAVY]: theme.palette.success.main,
    [GameWeightLevel.HEAVY]: theme.palette.warning.main,
    [GameWeightLevel.HARDCORE]: theme.palette.error.main,
  };

  return colors[level];
};
