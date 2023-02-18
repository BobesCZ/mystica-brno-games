export const validateFirebaseKey = (key: string): string => key.replace(/[\[\].#$\/\u0000-\u001F\u007F]/, '');
