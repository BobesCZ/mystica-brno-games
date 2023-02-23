import { GamePlayingTimeInterval, GamePlayingTimeType } from '../../../../shared/types';
import { CategoryFilters, CategoryGroup, CategoryKey } from './types';

export const CATEGORY_DEFAULT_VALUES: CategoryFilters = {
  playersCount: 2,
  playingTime: GamePlayingTimeType.FILLER,
  categories: [],
  mechanics: [],
};

export const CATEGORY_PLAYING_TIME_INTERVALS: Record<GamePlayingTimeType, GamePlayingTimeInterval> = {
  [GamePlayingTimeType.ALL]: { min: 0, max: 9999 },
  [GamePlayingTimeType.FILLER]: { min: 1, max: 20 },
  [GamePlayingTimeType.SHORT]: { min: 21, max: 60 },
  [GamePlayingTimeType.MEDIUM]: { min: 61, max: 90 },
  [GamePlayingTimeType.LONG]: { min: 91, max: 9999 },
};

export const MERGED_CATEGORIES = {
  historical: [
    'Ancient',
    'Medieval',
    'Renaissance',
    'Pike and Shot',
    'Age of Reason',
    'Napoleonic',
    'Post-Napoleonic',
    'World War I',
    'World War II',
    'Korean War',
    'Vietnam War',
    'Modern Warfare',
    'American Revolutionary War',
    'American Civil War',
    'American Indian Wars',
    'American West',
  ],
  popculture: ['Comic Book / Strip', 'Book', 'Movies / TV / Radio theme', 'Novel-based', 'Video Game Theme'],
  abstractStrategy: 'Abstract Strategy',
  actionDexterity: 'Action / Dexterity',
  adventure: 'Adventure',
  animals: 'Animals',
  arabian: 'Arabian',
  aviationFlight: 'Aviation / Flight',
  bluffing: 'Bluffing',
  cardGame: 'Card Game',
  childrensGame: "Children's Game",
  cityBuilding: 'City Building',
  civilization: 'Civilization',
  collectibleComponents: 'Collectible Components',
  deduction: 'Deduction',
  dice: 'Dice',
  economic: 'Economic',
  educational: 'Educational',
  // electronic: 'Electronic',
  environmental: 'Environmental',
  // expansionForBaseGame: 'Expansion for Base-game',
  exploration: 'Exploration',
  // fanExpansion: 'Fan Expansion',
  fantasy: 'Fantasy',
  farming: 'Farming',
  fighting: 'Fighting',
  // gameSystem: 'Game System',
  horror: 'Horror',
  humor: 'Humor',
  industryManufacturing: 'Industry / Manufacturing',
  mafia: 'Mafia',
  math: 'Math',
  matureAdult: 'Mature / Adult',
  maze: 'Maze',
  medical: 'Medical',
  memory: 'Memory',
  // miniatures: 'Miniatures',
  murderMystery: 'Murder/Mystery',
  music: 'Music',
  mythology: 'Mythology',
  nautical: 'Nautical',
  negotiation: 'Negotiation',
  // number: 'Number',
  partyGame: 'Party Game',
  pirates: 'Pirates',
  political: 'Political',
  // printPlay: 'Print & Play',
  puzzle: 'Puzzle',
  racing: 'Racing',
  // realTime: 'Real-time',
  religious: 'Religious',
  scienceFiction: 'Science Fiction',
  spaceExploration: 'Space Exploration',
  spiesSecretAgents: 'Spies/Secret Agents',
  sports: 'Sports',
  territoryBuilding: 'Territory Building',
  trains: 'Trains',
  // transportation: 'Transportation',
  // travel: 'Travel',
  trivia: 'Trivia',
  wargame: 'Wargame',
  wordGame: 'Word Game',
  zombies: 'Zombies',
};

export const GROUPED_CATEGORIES: Partial<Record<CategoryGroup, CategoryKey[]>> = {
  favourites: ['actionDexterity', 'bluffing', 'cardGame', 'childrensGame', 'humor', 'partyGame', 'trivia'],
  topics: [
    'popculture',
    'animals',
    'arabian',
    'aviationFlight',
    'environmental',
    'fantasy',
    'mafia',
    'math',
    'medical',
    'music',
    'mythology',
    'nautical',
    'pirates',
    'political',
    'religious',
    'scienceFiction',
    'spaceExploration',
    'spiesSecretAgents',
    'sports',
    'trains',
    'zombies',
  ],
};
