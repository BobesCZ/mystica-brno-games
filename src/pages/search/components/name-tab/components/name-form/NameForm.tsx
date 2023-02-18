import { Box, Container, Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ControlledAutocomplete } from '../../../../../../components';
import { NameFilters } from '../../types';

type Props = {
  gameListOptions: string[];
};

export const NameForm = ({ gameListOptions }: Props) => {
  const { control } = useFormContext<NameFilters>();

  return (
    <Box pt={4} pb={4} sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}>
      <Container>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid item xs={12}>
            <ControlledAutocomplete<NameFilters, 'name'>
              control={control}
              name="name"
              label="Název hry"
              options={gameListOptions}
              freeSolo
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
