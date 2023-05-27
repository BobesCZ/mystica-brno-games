import { Box, Container, Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import {
  ControlleAutocompleteOption,
  ControlledAutocomplete,
  ControlledSelect,
  ControlledSelectOption,
} from '../../../../../shared/components';

import { CategoryFilters } from '../../types';
import { Alarm, Group } from '@mui/icons-material';

type Props = {
  playersCountOptions: ControlledSelectOption<CategoryFilters, 'playersCount'>[];
  playingTimeOptions: ControlledSelectOption<CategoryFilters, 'playingTime'>[];
  langsOptions: ControlleAutocompleteOption[];
  categoryOptions: ControlleAutocompleteOption[];
  mechanicsOptions: ControlleAutocompleteOption[];
};

export const CategoryForm = ({
  playersCountOptions,
  playingTimeOptions,
  langsOptions,
  categoryOptions,
  mechanicsOptions,
}: Props) => {
  const { t } = useTranslation();
  const { control } = useFormContext<CategoryFilters>();

  return (
    <Box py={4} sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}>
      <Container>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid item xs={12} md={6}>
            <ControlledSelect<CategoryFilters, 'playersCount'>
              control={control}
              name="playersCount"
              label={t('search.form.playersCount.label')}
              options={playersCountOptions}
              Icon={Group}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledSelect<CategoryFilters, 'playingTime'>
              control={control}
              name="playingTime"
              label={t('search.form.playingTime.label')}
              options={playingTimeOptions}
              Icon={Alarm}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledAutocomplete<CategoryFilters, 'categories'>
              control={control}
              name="categories"
              label={t('search.form.categories.label')}
              options={categoryOptions}
              noOptionsText={<Trans t={t} i18nKey="common.noOptionsText" />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledAutocomplete<CategoryFilters, 'mechanics'>
              control={control}
              name="mechanics"
              label={t('search.form.mechanics.label')}
              options={mechanicsOptions}
              noOptionsText={<Trans t={t} i18nKey="common.noOptionsText" />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledAutocomplete<CategoryFilters, 'langs'>
              control={control}
              name="langs"
              label={t('search.form.langs.label')}
              options={langsOptions}
              noOptionsText={<Trans t={t} i18nKey="common.noOptionsText" />}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
