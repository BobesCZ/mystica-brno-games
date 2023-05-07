import { Theme } from '@mui/material';
import { Rating } from '../../../../types';

export const getIconColor = ({ value }: Rating, theme: Theme): string => {
  if (value < 3) {
    return theme.palette.success.main;
  }
  if (value >= 3 && value < 4) {
    return theme.palette.warning.main;
  }

  return theme.palette.error.main;
};
