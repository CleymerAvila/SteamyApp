import { Store, StoreApiModel } from "../models";


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
}
