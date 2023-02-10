import { DataSnapshot } from 'firebase/database';

export const resolveFetchedData = <T>(source: DataSnapshot[]): T =>
  source?.reduce(
    (result: T, i) => ({
      ...result,
      [i.key as string]: i.val(),
    }),
    {} as T,
  );

export const resolveFetchedDataList = <T>(source: DataSnapshot[]): Array<T> =>
  source?.reduce((result: Array<T>, i) => [...result, i.val()], [] as Array<T>);

export const validateFirebaseKey = (key: string): string => key.replace(/[\[\].#$\/\u0000-\u001F\u007F]/, '');
