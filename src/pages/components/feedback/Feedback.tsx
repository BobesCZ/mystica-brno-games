import { Alert, Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Trans, useTranslation } from 'react-i18next';
import { FeedbackFields } from './types';
import { FEEDBACK_DEFAULT_VALUES } from './config';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FeedbackForm } from './components';
import { FeedbackRecord } from '../../../shared/types';
import { updateFeedback } from '../../../shared/firebase';
import { PageTitle } from '../../../shared/components';

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
    <>
      <PageTitle i18nKey="feedback.pageTitle" />

      <Container maxWidth="sm" sx={{ mt: 4, mb: 12 }}>
        <Typography textAlign="center">
          <Trans t={t} i18nKey="feedback.contentParagraph" />
        </Typography>

        <FormProvider {...methods}>
          <Box component="form" mt={3} onSubmit={methods.handleSubmit(onSubmit)}>
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
    </>
  );
};
