export enum CsvColumns {
  TYPE = 'Hra / Poznámka',
  SOURCE_NAME = 'Název hry',
  ID = 'BGG ID',
  LANGS = 'Jazyky',
  LOCATION = 'Umístění',
  ADDED = 'Datum přidání',
}

export enum CsvGameType {
  GAME = 'GAME',
}

export type CsvGame = Record<CsvColumns, string>;
