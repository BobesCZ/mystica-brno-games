import { Box, Container, Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { ControlledAutocomplete } from '../../../../../../shared/components';
import { NameFilters } from '../../types';

type Props = {
  gameListOptions: string[];
};

export const NameForm = ({ gameListOptions }: Props) => {
  const { t } = useTranslation();
  const { control } = useFormContext<NameFilters>();

  return (
    <Box pt={4} pb={4} sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}>
      <Container>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid item xs={12}>
            <ControlledAutocomplete<NameFilters, 'name'>
              control={control}
              name="name"
              label={t('search.form.name.label')}
              options={gameListOptions}
              noOptionsText={<Trans t={t} i18nKey="common.noOptionsText" />}
              freeSolo
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
