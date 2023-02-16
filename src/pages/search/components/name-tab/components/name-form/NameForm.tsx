import { Box, Container, Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ControlledTextField } from '../../../../../../components';
import { NameFilters } from '../../types';

export const NameForm = () => {
  const { control } = useFormContext<NameFilters>();

  return (
    <Box pt={4} pb={4} sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}>
      <Container>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid item xs={12}>
            <ControlledTextField<NameFilters, 'name'> control={control} name="name" label="Název hry" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
