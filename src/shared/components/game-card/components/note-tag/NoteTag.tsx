import { Add } from '@mui/icons-material';
import { Chip } from '@mui/material';

type Props = {
  note: string;
};

export const NoteTag = ({ note }: Props) => (
  <Chip
    variant="outlined"
    label={note}
    title={note}
    icon={<Add />}
    sx={{
      borderRadius: 0,
      '.MuiChip-icon': {
        fontSize: 18,
      },
    }}
  />
);
