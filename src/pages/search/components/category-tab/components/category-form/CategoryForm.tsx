import { Box, Container, Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { ControlledAutocomplete, ControlledSelect } from '../../../../../../shared/components';
import { getCategoryPlayersCountOptions, getCategoryPlayingTimeOptions } from '../../config';
import { CategoryFilters } from '../../types';

type Props = {
  categoryOptions: string[];
  mechanicsOptions: string[];
};

export const CategoryForm = ({ categoryOptions, mechanicsOptions }: Props) => {
  const { t } = useTranslation();
  const { control } = useFormContext<CategoryFilters>();

  return (
    <Box pt={4} pb={4} sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}>
      <Container>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid item xs={12} md={6}>
            <ControlledSelect<CategoryFilters, 'playersCount'>
              control={control}
              name="playersCount"
              label={t('search.form.playersCount.label')}
              options={getCategoryPlayersCountOptions(t)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledSelect<CategoryFilters, 'playingTime'>
              control={control}
              name="playingTime"
              label={t('search.form.playingTime.label')}
              options={getCategoryPlayingTimeOptions(t)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledAutocomplete<CategoryFilters, 'categories'>
              control={control}
              name="categories"
              label={t('search.form.categories.label')}
              options={categoryOptions}
              noOptionsText={<Trans t={t} i18nKey="common.noOptionsText" />}
              multiple
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledAutocomplete<CategoryFilters, 'mechanics'>
              control={control}
              name="mechanics"
              label={t('search.form.mechanics.label')}
              options={mechanicsOptions}
              noOptionsText={<Trans t={t} i18nKey="common.noOptionsText" />}
              multiple
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
