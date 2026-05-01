import { Store, StoreApiModel } from "../models";


export class StoreMapper {

  public static fromApiToModel(api: StoreApiModel): Store {
    return {
      id: api.storeID,
      name: api.storeName,
      isActive: api.isActive === 1,
      images: api.images
    }
  }

  public static fromApiList(apiList: StoreApiModel[]): Store[] {
    return apiList.map(store => this.fromApiToModel(store));
  }
}
