// models/api/store-api.model.ts
export interface StoreApiModel {
  storeID: string;
  storeName: string;
  isActive: number; // 0 o 1
  images: {
    banner: string;
    logo: string;
    icon: string;
  };
}

// models/api/deal-api.model.ts
export interface DealApiModel {
  internalName: string;
  title: string;
  metacriticLink: string | null;
  dealID: string;
  storeID: string;       // ← es string, aunque sea un número
  gameID: string;        // ← relación con /games
  salePrice: string;     // ← OJO: string, no number
  normalPrice: string;   // ← string también
  isOnSale: string;      // "0" o "1" — sí, string
  savings: string;       // porcentaje como string
  metacriticScore: string;
  steamRatingText: string | null;
  steamRatingPercent: string;
  steamRatingCount: string;
  releaseDate: number;   // timestamp
  lastChange: number;    // timestamp
  dealRating: string;
  thumb: string;
}

// models/api/game-api.model.ts
// Respuesta de /games?id=XXX (detalle)
export interface GameDealApiModel {
  storeID: string;
  dealID: string;
  price: string;
  retailPrice: string;
  savings: string;
}

export interface GameApiModel {
  info: {
    title: string;
    steamAppID: string | null;
    thumb: string;
  };
  cheapestPriceEver: {
    price: string;
    date: number;
  };
  deals: GameDealApiModel[]; // ← lista embebida
}

// Respuesta de /games?title=XXX (búsqueda)
export interface GameSearchApiModel {
  gameID: string;
  steamAppID: string | null;
  cheapest: string;
  cheapestDealID: string;
  external: string; // título del juego
  thumb: string;
}
