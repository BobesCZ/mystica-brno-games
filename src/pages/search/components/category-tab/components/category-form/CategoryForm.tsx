import { Box, Container, Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ControlledAutocomplete, ControlledSelect } from '../../../../../../shared/components';
import { CATEGORY_PLAYERS_COUNT_OPTIONS, CATEGORY_PLAYING_TIME_OPTIONS } from '../../config';
import { CategoryFilters } from '../../types';

type Props = {
  categoryOptions: string[];
  mechanicsOptions: string[];
};

export const CategoryForm = ({ categoryOptions, mechanicsOptions }: Props) => {
  const { control } = useFormContext<CategoryFilters>();

  return (
    <Box pt={4} pb={4} sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}>
      <Container>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid item xs={12} md={6}>
            <ControlledSelect<CategoryFilters, 'playersCount'>
              control={control}
              name="playersCount"
              label="Pro kolik lidí?"
              options={CATEGORY_PLAYERS_COUNT_OPTIONS}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledSelect<CategoryFilters, 'playingTime'>
              control={control}
              name="playingTime"
              label="Jak dlouhá hra?"
              options={CATEGORY_PLAYING_TIME_OPTIONS}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledAutocomplete<CategoryFilters, 'categories'>
              control={control}
              name="categories"
              label="Kategorie her"
              options={categoryOptions}
              multiple
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledAutocomplete<CategoryFilters, 'mechanics'>
              control={control}
              name="mechanics"
              label="Herní mechaniky"
              options={mechanicsOptions}
              multiple
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
