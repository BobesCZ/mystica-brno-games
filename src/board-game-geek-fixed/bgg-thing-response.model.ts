import {
  IAttributes,
  IBggThing,
  BggThing,
  BggThingType,
  IBggGame,
  BggExpansion,
  IBggExpansion,
  BggAccessory,
  IBggAccessory,
} from '@code-bucket/board-game-geek';
import { BggGame } from './bgg-game.model';

export interface IBggThingResponse {
  _declaration: IAttributes<{ version: string; encoding: string }>;
  items: { item: IBggThing | IBggThing[] } & IAttributes<{ termsofuse: string }>;
}

export class BggThingResponse {
  public items: BggThing[];

  /**
   * Alias for this.items[0]. Use only if you know there is only one item in response
   */
  public get item(): BggThing {
    return this.items[0];
  }

  /**
   * Alias for this.item.type
   */
  public get type(): BggThingType {
    return this.item?.type as BggThingType;
  }

  constructor(data: IBggThingResponse) {
    if (Array.isArray(data.items.item)) {
      this.items = data.items.item.map((item) => this.parseItem(item));
    } else {
      this.items = [this.parseItem(data.items.item)];
    }
  }

  private parseItem(item: IBggThing) {
    const type = item._attributes.type as BggThingType;

    switch (type) {
      case BggThingType.boardGame:
        return new BggGame(item as IBggGame);
      case BggThingType.boardGameExpansion:
        return new BggExpansion(item as IBggExpansion);
      case BggThingType.boardGameAccessory:
        return new BggAccessory(item as IBggAccessory);
    }
  }
}
