import { Deal, DealApiModel, StoreApiModel } from '../models';
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
}
