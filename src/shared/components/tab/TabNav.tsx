import { Tab as MuiTab } from '@mui/material';

type Props = {
  label: string;
};

export const TabNav = ({ label, ...rest }: Props) => (
  <MuiTab
    label={label}
    iconPosition="start"
    disableRipple
    sx={({ breakpoints }) => ({ fontWeight: 'bold', pt: 2.5, pb: 2, [breakpoints.up('lg')]: { pt: 3, pb: 2.5 } })}
    {...rest}
  />
);
