import { omitBy } from 'lodash-es';

export const validateFirebaseKey = (key: string): string => key.replace(/[\[\].#$\/\u0000-\u001F\u007F]/, '');

export const validateFirebaseValue = (object: Record<string, unknown>) => omitBy(object, (i) => i === undefined);
