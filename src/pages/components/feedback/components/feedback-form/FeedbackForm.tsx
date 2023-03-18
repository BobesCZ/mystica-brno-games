import { Button, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { ControlledTextField } from '../../../../../shared/components';

import { FeedbackFields } from '../../types';

export const FeedbackForm = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<FeedbackFields>();

  return (
    <Stack gap={3}>
      <ControlledTextField<FeedbackFields, 'message'>
        control={control}
        rules={{ required: true }}
        name="message"
        label={t('feedback.form.label')}
        multiline
        minRows={3}
      />

      <Button variant="contained" size="large" type="submit">
        <Trans t={t} i18nKey="feedback.form.submit" />
      </Button>
    </Stack>
  );
};
