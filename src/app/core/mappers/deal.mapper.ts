import { Deal, DealApiModel, DealDetail, DealDetailApiModel, StoreApiModel } from '../models';
import { StoreMapper } from './store.mapper';

export class DealMapper {
  static mapFromApiToModel(
    dealApiModel: DealApiModel,
    storeApi?: StoreApiModel,
  ): Deal {
    return {
      id: dealApiModel.dealID,
      gameId: dealApiModel.gameID,
      storeId: dealApiModel.storeID,
      store: storeApi ?
      StoreMapper.fromApiToModel(storeApi)
      :  undefined,
      title: dealApiModel.title,
      salePrice: parseFloat(dealApiModel.salePrice),
      normalPrice: parseFloat(dealApiModel.normalPrice),
      savings: parseFloat(dealApiModel.savings),
      isOnSale: dealApiModel.isOnSale === '1',
      metacriticScore: dealApiModel.metacriticScore
        ? parseInt(dealApiModel.metacriticScore)
        : null,
      steamRating: {
        text: dealApiModel.steamRatingText,
        percent: parseInt(dealApiModel.steamRatingPercent),
        count: parseInt(dealApiModel.steamRatingCount),
      },
      dealRating: parseFloat(dealApiModel.dealRating),
      releaseDate: new Date(dealApiModel.releaseDate * 1000),
      lastChange: new Date(dealApiModel.lastChange * 1000),
      thumb: dealApiModel.thumb,
    };
  }

  static fromDealApiListToDealList(
    dealApiList: DealApiModel[],
    storeApiList?: StoreApiModel[],
  ): Deal[] {
    return dealApiList.map((deal) =>
      this.mapFromApiToModel(
        deal,
        storeApiList ?
        storeApiList.find((store) => store.storeID === deal.storeID) : undefined,
      ),
    );
  }

  static fromDealDetailApiToDealDetail(dealDetailApi: DealDetailApiModel): DealDetail {
    return {
        gameInfo: {
          storeId: dealDetailApi.gameInfo.storeID,
          gameId: dealDetailApi.gameInfo.gameID,
          name: dealDetailApi.gameInfo.name,
          steamAppId: dealDetailApi.gameInfo.steamAppID ?? null,
          salePrice: Number.parseFloat(dealDetailApi.gameInfo.salePrice),
          retailPrice: Number.parseFloat(dealDetailApi.gameInfo.retailPrice),
          steamRating: {
            text: dealDetailApi.gameInfo.steamRatingText,
            percent: Number.parseInt(dealDetailApi.gameInfo.steamRatingPercent),
            count: Number.parseInt(dealDetailApi.gameInfo.steamRatingCount!),
          },
          metacriticScore: Number.parseInt(dealDetailApi.gameInfo.metacriticScore),
          metacriticLink: dealDetailApi.gameInfo.metacriticLink,
          releaseDate: new Date(dealDetailApi.gameInfo.releaseDate * 1000),
          publisher: dealDetailApi.gameInfo.publisher,
          steamworks: dealDetailApi.gameInfo.steamworks === '1',
          thumb: dealDetailApi.gameInfo.thumb
        },
        cheaperStores: StoreMapper.fromCheaperStoreApiListToCheaperStoreList(dealDetailApi.cheaperStores),
        cheapestPrice: {
          price: Number.parseFloat(dealDetailApi.cheapestPrice.price),
          date: new Date(dealDetailApi.cheapestPrice.date * 1000),
        }
    }
  }
}
