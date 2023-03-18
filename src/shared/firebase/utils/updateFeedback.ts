import { update } from 'firebase/database';
import { FeedbackRecord } from '../../types';
import { FEEDBACK_REF } from '../config';

export const updateFeedback = ({ timestamp, ...feedbackRecord }: FeedbackRecord): void => {
  const dbReference = FEEDBACK_REF;
  const feedbackRecordIndexed = { [timestamp]: feedbackRecord };

  if (dbReference) {
    update(dbReference, feedbackRecordIndexed);
  }
};
