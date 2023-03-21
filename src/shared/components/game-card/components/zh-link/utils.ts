import { Game } from '../../../../types';

export const parseName = (sourceName: Game['sourceName']) =>
  sourceName.replace('–', '').replace('-', '').replace(':', '');
