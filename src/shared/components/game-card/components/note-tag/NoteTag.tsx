import { Add } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';

type Props = {
  note: string;
};

export const NoteTag = ({ note }: Props) => (
  <Tooltip arrow enterDelay={700} enterTouchDelay={100} title={note}>
    <Chip
      variant="outlined"
      label={note}
      icon={<Add />}
      sx={{
        borderRadius: 0,
        '.MuiChip-icon': {
          fontSize: 18,
        },
      }}
    />
  </Tooltip>
);
