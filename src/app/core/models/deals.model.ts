import { Store } from "./stores.model";

export interface Deal {
  id: string;           // dealID
  gameId: string;       // para relacionar con Game
  storeId: string;      // para relacionar con Store
  store?: Store;        // relación resuelta opcionalmente
  title: string;
  salePrice: number;    // ← ya es number
  normalPrice: number;
  savings: number;      // porcentaje real 0-100
  isOnSale: boolean;
  metacriticScore: number | null;
  steamRating: {
    text: string | null;
    percent: number;
    count: number;
  };
  dealRating: number;
  releaseDate: Date;
  lastChange: Date;
  thumb: string;
}

// models/domain/deal-detail.model.ts

export interface CheaperStore {
  dealId: string;
  storeId: string;
  store?: Store;           // relación resuelta opcionalmente
  salePrice: number;
  retailPrice: number;
}

export interface DealDetail {
  gameInfo: {
    storeId: string;
    gameId: string;
    name: string;
    steamAppId: string | null;
    salePrice: number;
    retailPrice: number;
    steamRating: {
      text: string | null;
      percent: number;
      count: number | null;
    };
    metacriticScore: number | null;
    metacriticLink: string | null;
    releaseDate: Date;
    publisher: string;
    steamworks: boolean;
    thumb: string;
  };
  cheaperStores: CheaperStore[];
  cheapestPrice: {
    price: number;
    date: Date;
  };
}
