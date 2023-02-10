import { Box, Container, Grid, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ControlledAutocomplete, ControlledAutocompleteOption, ControlledSelect } from '../../../components';
import { Filters } from '../../../types';
import { FILTER_PLAYERS_COUNT_OPTIONS, FILTER_PLAYING_TIME_OPTIONS } from '../config';

type SearchFormProps = {
  categoryOptions: ControlledAutocompleteOption[];
  mechanicsOptions: ControlledAutocompleteOption[];
};

export const SearchForm = ({ categoryOptions, mechanicsOptions }: SearchFormProps) => {
  const { control } = useFormContext<Filters>();

  return (
    <Box pt={1} pb={4} sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}>
      <Container>
        <Box mb={4}>
          <Typography variant="h5" textAlign="center">
            Najděte si hru přímo pro vás
          </Typography>
        </Box>

        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid item xs={12} md={6}>
            <ControlledSelect<Filters, 'playersCount'>
              control={control}
              name="playersCount"
              label="Pro kolik lidí?"
              options={FILTER_PLAYERS_COUNT_OPTIONS}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledSelect<Filters, 'playingTime'>
              control={control}
              name="playingTime"
              label="Jak dlouhá hra?"
              options={FILTER_PLAYING_TIME_OPTIONS}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledAutocomplete<Filters, 'categories'>
              control={control}
              name="categories"
              label="Kategorie her"
              options={categoryOptions}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledAutocomplete<Filters, 'mechanics'>
              control={control}
              name="mechanics"
              label="Herní mechaniky"
              options={mechanicsOptions}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
