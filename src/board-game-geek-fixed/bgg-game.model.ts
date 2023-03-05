import {
  IAttributes,
  IBggThingAttributes,
  IBggName,
  IBggPoll,
  IBggLink,
  IBggVersion,
  BggLink,
  BggName,
  BggPoll,
  BggNameType,
  BggLinkType,
} from '@code-bucket/board-game-geek';
import { BggVersion } from './bgg-version.model';
import { IBggRank, IBggRatings } from './types';

export interface IBggGame extends IAttributes<IBggThingAttributes> {
  thumbnail: { _text: string };
  image: { _text: string };
  name: IBggName[] | IBggName;
  description: { _text: string };
  yearpublished: IAttributes<{ value: string }>;
  minplayers: IAttributes<{ value: string }>;
  maxplayers: IAttributes<{ value: string }>;
  poll: IBggPoll[];
  playingtime: IAttributes<{ value: string }>;
  minplaytime: IAttributes<{ value: string }>;
  maxplaytime: IAttributes<{ value: string }>;
  minage: IAttributes<{ value: string }>;
  link: IBggLink[] | IBggLink;
  versions: { item: IBggVersion[] | IBggVersion };
  statistics?: {
    ratings: {
      average: IAttributes<{ value: string }>;
      averageweight: IAttributes<{ value: string }>;
      bayesaverage: IAttributes<{ value: string }>;
      median: IAttributes<{ value: string }>;
      numcomments: IAttributes<{ value: string }>;
      numweights: IAttributes<{ value: string }>;
      owned: IAttributes<{ value: string }>;
      ranks: {
        rank: IAttributes<{
          bayesaverage: string;
          friendlyname: string;
          id: string;
          name: string;
          type: string;
          value: string;
        }>[];
      };
      stddev: IAttributes<{ value: string }>;
      trading: IAttributes<{ value: string }>;
      usersrated: IAttributes<{ value: string }>;
      wanting: IAttributes<{ value: string }>;
      wishing: IAttributes<{ value: string }>;
    };
  };
}

/**
 * Parsed game from bgg xml data
 */
export class BggGame {
  public id: number;
  public type: 'boardgame' | string;
  public thumbnail: string;
  public image: string;
  public links: BggLink[];
  public names: BggName[];
  public yearpublished?: number;
  public description: string;
  public minplayers: number;
  public maxplayers: number;
  public polls: BggPoll[];
  public playingtime: number;
  public minplaytime: number;
  public maxplaytime: number;
  public minage: number;
  public versions: BggVersion[];
  public ratings: IBggRatings;

  // Getters

  public get namesValues(): string[] {
    return this.names.map((name) => name.value);
  }

  public get primaryName(): string | undefined {
    return this.names.find((name) => name.type === BggNameType.primary)?.value;
  }

  public get categories(): BggLink[] {
    return this.links.filter((link) => link.type === BggLinkType.boardGameCategory);
  }

  public get mechanics(): BggLink[] {
    return this.links.filter((link) => link.type === BggLinkType.boardGameMechanic);
  }

  public get families(): BggLink[] {
    return this.links.filter((link) => link.type === BggLinkType.boardGameFamily);
  }

  public get expansions(): BggLink[] {
    return this.links.filter((link) => link.type === BggLinkType.boardGameExpansion);
  }

  public get implementations(): BggLink[] {
    return this.links.filter((link) => link.type === BggLinkType.boardGameImplementation);
  }

  public get designers(): BggLink[] {
    return this.links.filter((link) => link.type === BggLinkType.boardGameDesigner);
  }

  public get artists(): BggLink[] {
    return this.links.filter((link) => link.type === BggLinkType.boardGameArtist);
  }

  public get publishers(): BggLink[] {
    return this.links.filter((link) => link.type === BggLinkType.boardGamePublisher);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getRank(rank: any): IBggRank | undefined {
    const {
      _attributes: { bayesaverage, friendlyname, id, name, type, value },
    } = rank;

    const parsedValue = Number.parseInt(value);

    if (Number.isNaN(parsedValue)) {
      return undefined;
    }

    return {
      bayesaverage: Number.parseFloat(bayesaverage),
      friendlyname,
      id: Number.parseInt(id),
      name,
      type,
      value: parsedValue,
    };
  }

  constructor(data: IBggGame) {
    this.id = Number.parseInt(data._attributes.id);
    this.type = data._attributes.type;
    this.thumbnail = data.thumbnail?._text?.trim();
    this.image = data.image?._text?.trim();
    this.links = Array.isArray(data.link) ? data.link.map((link) => new BggLink(link)) : [new BggLink(data.link)];
    this.names = Array.isArray(data.name) ? data.name.map((name) => new BggName(name)) : [new BggName(data.name)];
    this.yearpublished = data.yearpublished ? Number.parseInt(data.yearpublished._attributes.value) : undefined;
    this.description = data.description._text?.trim();
    this.minplayers = Number.parseInt(data.minplayers._attributes.value);
    this.maxplayers = Number.parseInt(data.maxplayers._attributes.value);
    this.polls = data.poll.map((poll) => new BggPoll(poll));
    this.playingtime = Number.parseInt(data.playingtime._attributes.value);
    this.minplaytime = Number.parseInt(data.minplaytime._attributes.value);
    this.maxplaytime = Number.parseInt(data.maxplaytime._attributes.value);
    this.minage = Number.parseInt(data.minage._attributes.value);
    this.versions = Array.isArray(data.versions.item)
      ? data.versions.item.map((version) => new BggVersion(version))
      : data.versions.item
      ? [new BggVersion(data.versions.item)]
      : [];
    this.ratings = {
      average: Number.parseFloat(data.statistics?.ratings.average._attributes.value || '') ?? -1,
      averageweight: Number.parseFloat(data.statistics?.ratings.averageweight._attributes.value || '') ?? -1,
      bayesaverage: Number.parseFloat(data.statistics?.ratings.bayesaverage._attributes.value || '') ?? -1,
      median: Number.parseFloat(data.statistics?.ratings.median._attributes.value || '') ?? -1,
      numcomments: Number.parseInt(data.statistics?.ratings.numcomments._attributes.value || '') ?? -1,
      numweights: Number.parseInt(data.statistics?.ratings.numweights._attributes.value || '') ?? -1,
      ranks: [
        ...(Array.isArray(data.statistics?.ratings?.ranks?.rank)
          ? (data.statistics?.ratings?.ranks?.rank || []).map((rank) => this.getRank(rank))
          : [this.getRank(data.statistics?.ratings?.ranks?.rank)]),
      ].filter((i): i is IBggRank => i !== undefined),
      owned: Number.parseInt(data.statistics?.ratings.owned._attributes.value || '') ?? -1,
      stddev: Number.parseFloat(data.statistics?.ratings.stddev._attributes.value || '') ?? -1,
      trading: Number.parseInt(data.statistics?.ratings.trading._attributes.value || '') ?? -1,
      usersrated: Number.parseInt(data.statistics?.ratings.usersrated._attributes.value || '') ?? -1,
      wanting: Number.parseInt(data.statistics?.ratings.wanting._attributes.value || '') ?? -1,
      wishing: Number.parseInt(data.statistics?.ratings.wishing._attributes.value || '') ?? -1,
    };
  }
}
