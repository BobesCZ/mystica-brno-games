import { Alert, Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Trans, useTranslation } from 'react-i18next';
import { FeedbackFields } from './types';
import { FEEDBACK_DEFAULT_VALUES } from './config';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FeedbackForm } from './components';
import { FeedbackRecord } from '../../../shared/types';
import { updateFeedback } from '../../../shared/firebase';

export const Feedback = () => {
  const { t } = useTranslation();
  const methods = useForm<FeedbackFields>({
    defaultValues: FEEDBACK_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<FeedbackFields> = async (values, e) => {
    e?.preventDefault();
    const now = new Date();
    const feedbackRecord: FeedbackRecord = { ...values, timestamp: now.getTime(), time: now.toLocaleString('cs-CZ') };

    updateFeedback(feedbackRecord);
  };

  const isSubmitted = methods.formState.isSubmitSuccessful;

  return (
    <Container maxWidth="sm" sx={{ mb: 10 }}>
      <Box mt={5} mb={3}>
        <Typography variant="h2" textAlign="center">
          <Trans t={t} i18nKey="feedback.pageTitle" />
        </Typography>
      </Box>

      <Typography variant="body1" textAlign="center">
        <Trans t={t} i18nKey="feedback.contentParagraph" />
      </Typography>

      <FormProvider {...methods}>
        <Box component="form" py={4} onSubmit={methods.handleSubmit(onSubmit)}>
          {isSubmitted ? (
            <Alert variant="outlined" severity="success">
              <Trans t={t} i18nKey="feedback.form.success" />
            </Alert>
          ) : (
            <FeedbackForm />
          )}
        </Box>
      </FormProvider>
    </Container>
  );
};
