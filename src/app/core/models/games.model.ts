import { Store } from "./stores.model";

export interface Game {
  id?: string;
  title: string;
  steamAppId: string | null;
  thumb: string;
  cheapestPriceEver: {
    price: number;
    date: Date;
  };
  deals: GameDeal[];    // lista de objetos, no de IDs
}

// models/domain/game.model.ts
export interface GameDeal {
  storeId: string;
  store?: Store;        // relación resuelta
  dealId: string;
  price: number;
  retailPrice: number;
  savings: number;
}

export interface GameSummary {
  gameId: string;
  steamAppId: string | null;
  title: string;
  cheapestPrice: number;
  cheapestDealId: string;
  thumb: string;
}
