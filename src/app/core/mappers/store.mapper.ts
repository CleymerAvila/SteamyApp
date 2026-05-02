import { CheaperStore, CheaperStoreApiModel, Store, StoreApiModel } from "../models";


export class StoreMapper {

  private static readonly BASE_URL = 'https://www.cheapshark.com'

  public static fromApiToModel(api: StoreApiModel): Store {
    return {
      id: api.storeID,
      name:  api.storeName,
      isActive: api.isActive === 1,
      images: {
        banner: `${this.BASE_URL}${api.images.banner}`,
        icon: `${this.BASE_URL}${api.images.icon}`,
        logo: `${this.BASE_URL}${api.images.logo}`
      }
    }
  }

  public static fromApiList(apiList: StoreApiModel[]): Store[] {
    return apiList.map(store => this.fromApiToModel(store));
  }

  public static fromCheaperStoreApiToCheaperStore(cheaperStoreApi: CheaperStoreApiModel): CheaperStore {
    return {
      dealId: cheaperStoreApi.dealID,
      storeId: cheaperStoreApi.storeID,
      salePrice: Number.parseFloat(cheaperStoreApi.salePrice),
      retailPrice: Number.parseFloat(cheaperStoreApi.retailPrice)
    }
  }

  public static fromCheaperStoreApiListToCheaperStoreList(cheaperStoreApiList: CheaperStoreApiModel[]): CheaperStore[] {
    return cheaperStoreApiList.map((cheaperStoreApi) => this.fromCheaperStoreApiToCheaperStore(cheaperStoreApi))
  }
}
