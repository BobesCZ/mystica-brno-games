import { Box, Container, Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RankFilters } from '../../types';
import { Group } from '@mui/icons-material';
import { ControlledSelect, ControlledSelectOption } from '../../../../../shared/components';

type Props = {
  rankNameOptions: ControlledSelectOption<RankFilters, 'rankName'>[];
};

export const RankForm = ({ rankNameOptions }: Props) => {
  const { t } = useTranslation();
  const { control } = useFormContext<RankFilters>();

  return (
    <Box pt={4} pb={4} sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}>
      <Container>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid item xs={12} md={6}>
            <ControlledSelect<RankFilters, 'rankName'>
              control={control}
              name="rankName"
              label={t('rank.form.rankName.label')}
              options={rankNameOptions}
              Icon={Group}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
