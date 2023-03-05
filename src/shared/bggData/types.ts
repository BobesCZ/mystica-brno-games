import { BGG_CATEGORIES, BGG_MECHANICS } from './config';

export type CategoryKey = keyof typeof BGG_CATEGORIES;

export type MechanicKey = keyof typeof BGG_MECHANICS;
