import { Tab as MuiTab } from '@mui/material';

type TabProps = {
  label: string;
};

export const Tab = ({ label, ...rest }: TabProps) => (
  <MuiTab label={label} iconPosition="start" disableRipple sx={{ fontWeight: 'bold', pt: 2, pb: 1 }} {...rest} />
);
