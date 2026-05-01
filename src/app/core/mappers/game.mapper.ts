
import {
  GameApiModel,
  GameDealApiModel,
  GameSearchApiModel,
  Game,
  GameDeal,
  GameSummary,
  Store,
  StoreApiModel,
} from "../models";
import { StoreMapper } from "./store.mapper";

export class GameMapper {


  public static gameSearchApiToGameSummary(apiModel: GameSearchApiModel): GameSummary {
    return {
      gameId: apiModel.gameID,
      steamAppId: apiModel.steamAppID ?? null,
      title: apiModel.external,
      cheapestPrice: Number.parseFloat(apiModel.cheapest),
      cheapestDealId: apiModel.cheapestDealID,
      thumb: apiModel.thumb
    }
  }

  public static gameSearchListToGameSummaryList(apiSearchList: GameSearchApiModel[]): GameSummary[] {
    return apiSearchList.map((gameSearch) => this.gameSearchApiToGameSummary(gameSearch));

  }

  public static gameDealApiToGameDeal(gameDealApi: GameDealApiModel, storeApi?: StoreApiModel): GameDeal {
    return {
      storeId: gameDealApi.storeID,
      store:  storeApi ? StoreMapper.fromApiToModel(storeApi)  : undefined,
      dealId: gameDealApi.dealID,
      price: Number.parseFloat(gameDealApi.price),
      retailPrice: Number.parseFloat(gameDealApi.retailPrice),
      savings: Number.parseFloat(gameDealApi.savings)
    }
  }

  public static gameDealApiListToGameDealList(gameDealApiList: GameDealApiModel[]): GameDeal[] {
    return gameDealApiList.map((gameDealApi) => this.gameDealApiToGameDeal(gameDealApi));
  }

  public static mapFromGameApiModelToGame( gameApiModel: GameApiModel, gameId?: string): Game {
    return {
      id: gameId ? gameId : undefined,
      title: gameApiModel.info.title,
      steamAppId: gameApiModel.info.steamAppID ?? null,
      thumb: gameApiModel.info.thumb,
      cheapestPriceEver: {
        price:  Number.parseFloat(gameApiModel.cheapestPriceEver.price),
        date: new Date(gameApiModel.cheapestPriceEver.date * 1000),
      },
      deals: this.gameDealApiListToGameDealList(gameApiModel.deals)
    }
  }

  public static mapFromGameApiListToGameList(gameApiList: GameApiModel[]): Game[] {
    return gameApiList.map((gameApi) => this.mapFromGameApiModelToGame(gameApi));
  }

}
