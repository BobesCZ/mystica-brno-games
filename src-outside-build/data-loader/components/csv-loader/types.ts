import { CsvGame } from '../../../../src/data';
import { Game } from '../../../../src/shared/types';

export type CsvGameWithNotes = CsvGame & {
  notes: Game['notes'];
};
