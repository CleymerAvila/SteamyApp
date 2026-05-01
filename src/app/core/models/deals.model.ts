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
