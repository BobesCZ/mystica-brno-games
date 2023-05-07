import { SvgIconComponent } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  Icon: SvgIconComponent;
  children: ReactNode;
};

export const GameInfoItem = ({ Icon, children }: Props) => (
  <Stack direction="row" alignItems="center" gap={0.75}>
    {children && <Icon fontSize="inherit" sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: 18 })} />}
    <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
      {children}
    </Typography>
  </Stack>
);
