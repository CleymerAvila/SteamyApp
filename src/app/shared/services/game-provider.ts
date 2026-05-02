import { StoreApiModel } from './../../core/models/api-response.model';
import { Injectable } from '@angular/core';
import { firstValueFrom, switchMap } from 'rxjs';
import { DealMapper } from 'src/app/core/mappers/deal.mapper';
import { Deal, DealApiModel } from 'src/app/core/models';
import { HttpService } from 'src/app/core/services/http.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameProvider {

  constructor(private http: HttpService){}

  public async getTop5Deals(): Promise<Deal[]>{
    const dealsWithStore$ = this.http.get<DealApiModel[]>(`deals?pageSize=${5}`)
    .pipe(
      switchMap((dealsApi) => {
        return this.http.get<StoreApiModel[]>('stores').pipe(
          map((storesApi) => DealMapper.fromDealApiListToDealList(dealsApi, storesApi))
        )
      })
    )

    return firstValueFrom(dealsWithStore$);
  }

  public async getDeals(): Promise<Deal[]> {
    const deals$ = this.http.get<DealApiModel[]>(`deals?pageSize=${30}`)
    .pipe(
        switchMap((dealsApi) => {
        return this.http.get<StoreApiModel[]>('stores').pipe(
          map((storesApi) => DealMapper.fromDealApiListToDealList(dealsApi, storesApi))
        )
      })
    )

    return firstValueFrom(deals$);
  }

}
