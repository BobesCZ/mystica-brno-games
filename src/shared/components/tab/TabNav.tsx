import { Tab as MuiTab } from '@mui/material';

type Props = {
  label: string;
};

export const TabNav = ({ label, ...rest }: Props) => (
  <MuiTab label={label} iconPosition="start" disableRipple sx={{ fontWeight: 'bold', pt: 2, pb: 1 }} {...rest} />
);
